using System;
using System.IO;
using System.Net.Sockets;
using System.Text;
using System.Windows;
using Microsoft.Win32;

namespace FileTransferClient
{
    public partial class MainWindow : Window
    {
        private TcpClient client;
        private NetworkStream stream;

        public MainWindow()
        {
            InitializeComponent();
        }

        private void Connect_Click(object sender, RoutedEventArgs e)
        {
            string ip = txtServerIP.Text;
            int port;

            if (!int.TryParse(txtServerPort.Text, out port))
            {
                MessageBox.Show("Invalid port number.");
                return;
            }

            try
            {
                client = new TcpClient(ip, port);
                stream = client.GetStream();
                SendCommand("LIST");
                lstFiles.ItemsSource = ReceiveFileList();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Connection error: {ex.Message}");
                Disconnect();
            }
        }

        private void Download_Click(object sender, RoutedEventArgs e)
        {
            if (lstFiles.SelectedItem == null)
            {
                MessageBox.Show("Select a file to download.");
                return;
            }

            string fileName = lstFiles.SelectedItem.ToString();
            SaveFileDialog saveDialog = new SaveFileDialog { FileName = fileName };
            if (saveDialog.ShowDialog() == true)
            {
                try
                {
                    SendCommand("DOWNLOAD");
                    SendString(fileName);
                    ReceiveFile(saveDialog.FileName);
                    MessageBox.Show("File downloaded successfully.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Download error: {ex.Message}");
                }
            }
        }

        private void Upload_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openDialog = new OpenFileDialog();
            if (openDialog.ShowDialog() == true)
            {
                try
                {
                    SendCommand("UPLOAD");
                    SendString(Path.GetFileName(openDialog.FileName));
                    SendFile(openDialog.FileName);
                    MessageBox.Show("File uploaded successfully.");
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"Upload error: {ex.Message}");
                }
            }
        }

        private void SendCommand(string command)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(command);
            stream.Write(buffer, 0, buffer.Length);
        }

        private void SendString(string str)
        {
            byte[] buffer = Encoding.UTF8.GetBytes(str);
            stream.Write(buffer, 0, buffer.Length);
        }

        private string[] ReceiveFileList()
        {
            byte[] buffer = new byte[4096];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string fileList = Encoding.UTF8.GetString(buffer, 0, bytesRead).Trim();
            return fileList.Split('\n');
        }

        private void ReceiveFile(string filePath)
        {
            using (FileStream fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write))
            {
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = stream.Read(buffer, 0, buffer.Length)) > 0)
                {
                    fileStream.Write(buffer, 0, bytesRead);
                    if (Encoding.UTF8.GetString(buffer, 0, bytesRead) == "TRANSFER_COMPLETE")
                        break;
                }
            }
        }

        private void SendFile(string filePath)
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
            SendString("TRANSFER_COMPLETE");
        }

        private void Disconnect()
        {
            stream?.Close();
            client?.Close();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            Disconnect();
        }
    }
}
