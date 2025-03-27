using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace FileTransferServer
{
    class Program
    {
        static TcpListener server;
        static string filesDirectory = "Files"; // Папка для хранения файлов

        static void Main(string[] args)
        {
            Console.WriteLine("File Transfer Server");
            Console.Write("Enter port number: ");
            if (!int.TryParse(Console.ReadLine(), out int port))
            {
                Console.WriteLine("Invalid port number.");
                return;
            }

            if (!Directory.Exists(filesDirectory))
                Directory.CreateDirectory(filesDirectory);

            try
            {
                server = new TcpListener(IPAddress.Any, port);
                server.Start();
                Console.WriteLine($"Server started on port {port}. Waiting for connections...");

                while (true)
                {
                    TcpClient client = server.AcceptTcpClient();
                    Task.Run(() => HandleClient(client));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Server error: {ex.Message}");
            }
        }

        static void HandleClient(TcpClient client)
        {
            NetworkStream stream = null;
            try
            {
                stream = client.GetStream();
                byte[] buffer = new byte[4096];
                int bytesRead;

                // Получаем команду от клиента
                bytesRead = stream.Read(buffer, 0, buffer.Length);
                string command = Encoding.UTF8.GetString(buffer, 0, bytesRead).Trim();

                switch (command)
                {
                    case "LIST":
                        SendFileList(stream);
                        break;
                    case "DOWNLOAD":
                        ReceiveDownloadRequest(stream);
                        break;
                    case "UPLOAD":
                        ReceiveFile(stream);
                        break;
                    default:
                        SendResponse(stream, "INVALID_COMMAND");
                        break;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling client: {ex.Message}");
            }
            finally
            {
                stream?.Close();
                client.Close();
            }
        }

        static void SendFileList(NetworkStream stream)
        {
            string[] files = Directory.GetFiles(filesDirectory);
            string fileList = string.Join("\n", files.Select(f => Path.GetFileName(f)));
            SendResponse(stream, fileList);
        }

        static void ReceiveDownloadRequest(NetworkStream stream)
        {
            byte[] fileNameBuffer = new byte[256];
            int bytesRead = stream.Read(fileNameBuffer, 0, fileNameBuffer.Length);
            string fileName = Encoding.UTF8.GetString(fileNameBuffer, 0, bytesRead).Trim();

            string filePath = Path.Combine(filesDirectory, fileName);
            if (File.Exists(filePath))
            {
                SendFile(stream, filePath);
            }
            else
            {
                SendResponse(stream, "FILE_NOT_FOUND");
            }
        }

        static void SendFile(NetworkStream stream, string filePath)
        {
            using (FileStream fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read))
            {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = fileStream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    stream.Write(buffer, 0, bytesRead);
                }
            }
            SendResponse(stream, "TRANSFER_COMPLETE");
        }

        static void ReceiveFile(NetworkStream stream)
        {
            byte[] fileNameBuffer = new byte[256];
            int bytesRead = stream.Read(fileNameBuffer, 0, fileNameBuffer.Length);
            string fileName = Encoding.UTF8.GetString(fileNameBuffer, 0, bytesRead).Trim();

            string filePath = Path.Combine(filesDirectory, fileName);
            using (FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                byte[] buffer = new byte[4096];
                while ((bytesRead = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    fileStream.Write(buffer, 0, bytesRead);
                    if (Encoding.UTF8.GetString(buffer, 0, bytesRead) == "TRANSFER_COMPLETE")
                        break;
                }
            }
            SendResponse(stream, "UPLOAD_SUCCESS");
        }

        static void SendResponse(NetworkStream stream, string response)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(response);
            stream.Write(buffer, 0, buffer.Length);
        }
    }
}