#include <iostream>
#include <string>
#include <cctype>

using namespace std;

void applyFilter(string& text, const string& filter)
{
    for (char& c : text)
    {
        if (filter.find(c) != string::npos)
            c = ' ';
    }
}

int main()
{
    setlocale(LC_ALL, "ru");
    string text;
    cout << "Введите текст: ";
    getline(cin, text);

    string filter;
    cout << "Выберите фильтр (1 - латиница, 2 - кириллица, 3 - пунктуация, 4 - цифры): ";
    getline(cin, filter);

    if (filter == "1")
    {
        // Фильтр символов латинского алфавита
        applyFilter(text, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    else if (filter == "2")
    {
        // Фильтр символов кириллицы
        applyFilter(text, "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ");
    }
    else if (filter == "3")
    {
        // Фильтр символов пунктуации
        applyFilter(text, ".,:;!?-\"'()[]{}<>@#$%^&*_+=/\\|~`");
    }
    else if (filter == "4")
    {
        // Фильтр цифр
        applyFilter(text, "0123456789");
    }

    cout << "Отфильтрованный текст: " << text << endl;

    return 0;
}