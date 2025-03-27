#include <iostream>
#include <cstdlib>
#include <cstring>
using namespace std;

string executeCommand(const string& command)
{
    string result;
    char buffer[128];
    FILE* pipe = _popen(command.c_str(), "r");
    if (pipe != nullptr)
    {
        while (fgets(buffer, sizeof(buffer), pipe) != nullptr)
        {
            result += buffer;
        }
        _pclose(pipe);
    }
    return result;
}

void changeDirectory(const string& dirName)
{
    string command = "cd " + dirName;
    string output = executeCommand(command);
    if (output.empty())
    {
        cout << "Текущая директория успешно изменена." << endl;
    }
    else
    {
        cout << "Ошибка при изменении текущей директории." << endl;
    }
}

string getCurrentDirectory()
{
    string command = "cd";
    return executeCommand(command);
}

int main()
{
    setlocale(LC_ALL, "ru");
    string command;

    while (true)
    {
        cout << "Текущая директория: " << getCurrentDirectory();
        cout << "Введите команду (cd/exit): ";
        cin >> command;

        if (command == "cd")
        {
            string dirName;
            cout << "Введите имя директории: ";
            cin >> dirName;

            changeDirectory(dirName);
        }
        else if (command == "exit")
        {
            break;
        }
        else
        {
            cout << "Неверная команда. Повторите ввод." << endl;
        }
    }

    return 0;
}
