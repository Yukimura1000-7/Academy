#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <direct.h>
using namespace std;

void createNewDirectories(const string& path)
{
    if (_mkdir(path.c_str()) != 0)
    {
        cerr << "Ошибка во время создания директории: " << path << endl;
    }
}

void createNewFile(const string& path, const string& content)
{
    ofstream file(path);
    if (file.is_open())
    {
        file << content;
        file.close();
    }
    else
    {
        cerr << "Ошибка в создании файла: " << path << endl;
    }
}

void processNewLine(const string& line, const string& currentDir = "")
{
    istringstream iss(line);
    string word;
    vector<string> words;
    char ent = ' ';
    while (getline(iss, word, ent))
    {
        words.push_back(word);
    }

    if (words.empty())
    {
        cerr << "Пропуск." << endl;
        return;
    }

    string newDir = currentDir + words[0] + "/";
    createNewDirectories(newDir);

    if (words.size() > 1)
    {
        string newLine = line.substr(words[0].size() + 1);
        processNewLine(newLine, newDir);
    }
    else
    {
        string filePath = newDir + words[0] + ".txt";
        createNewFile(filePath, words[0]);
    }
}

int main()
{
    setlocale(LC_ALL, "ru");
    ifstream inputFile("C:\\Users\\glebe\\Desktop\\sm rabota\\input.txt");
    if (inputFile.is_open())
    {
        string line;
        while (getline(inputFile, line))
        {
            processNewLine(line);
        }
        inputFile.close();
    }
    else
    {
        cerr << "Ошибка при открытии файла" << endl;
    }
}