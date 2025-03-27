#include <iostream>
#include <vector>

using namespace std;

class Student
{
public:
	string name;
	string birthday;
	string group;
	vector<int> marks;

	Student(string nameP, string birthdayP, string groupP) : name(nameP), birthday(birthdayP), group(groupP) {};
	
	void setname(string nameP) { name = nameP; }
	void setbirthday(string birthdayP) { birthday = birthdayP; }
	void setgroup(string groupP) { group = groupP; }

	void setmark(int mark)
	{
		marks.push_back(mark);
		for (int mark : marks) { cout << mark; }
	}
	void setmarks(vector<int> newmarks) { marks = newmarks; }

	string getname() { return name; }
	string getbirthday() { return birthday; }
	string getgroup() { return group; }

	int getmark(int mark){ marks.back();}
	vector<int> getmarks() { return marks; }
};

void generateGraph(Student student) {
    vector<int> marks = student.getmarks();

    int maxMark = *max_element(marks.begin(), marks.end());

    vector<vector<char>> graph(maxMark + 1);
    for (int i = 0; i <= maxMark; i++) {
        graph[i].resize(marks.size(), ' ');
    }

    for (int i = 0; i < marks.size(); i++) {
        for (int j = 0; j < marks[i]; j++) {
            graph[j][i] = '*';
        }
    }

    for (int i = maxMark; i >= 0; i--) {
        for (int j = 0; j < marks.size(); j++) {
            cout << graph[i][j] << " ";
        }
        cout << endl;
    }
}

int main() {
    setlocale(LC_ALL, "ru");
    vector<Student> students;

    string input;

    while (true) {
        cout << "Enter input (type 'end' to stop or 'new' to create new student): ";
        cin >> input;

        if (input == "end") {
            break; // Exit the loop if the user entered "end"
        }
        else if (input == "new") {
            string name;
            string birthday;
            string group;
            vector<int> marksoo{ 5,5,5,5,5,5,5 };
            cin >> name;
            cin >> birthday;
            cin >> group;

            Student student(name, birthday, group);
            students.push_back(student);
        }
    }

    // Get the name of the student whose graph you want to generate
    cout << "Enter the name of the student whose graph you want to generate: ";
    string name;
    cin >> name;

    // Find the student in the list of students
    Student* studentPtr = nullptr;
    for (Student& student : students) {
        if (student.getname() == name) {
            studentPtr = &student;
            break;
        }
    }

    // If the student was found, generate the graph
    if (studentPtr != nullptr) {
        generateGraph(*studentPtr);
    }
    else {
        cout << "Student not found." << endl;
    }

    return 0;
}