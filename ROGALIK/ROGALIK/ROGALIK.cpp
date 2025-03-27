#include <iostream> 
#include <windows.h> 
#include <list> 
#include <conio.h>
#include <vector>
using namespace std;
char emptyChar = '-';

class SuperObject;
class Item;
class Coin;
class Coord
{
public:
    int x{ 0 };
    int y{ 0 };
    Coord(int xP, int yP) :
        x{ xP }, y{ yP } {};
    Coord& operator()(int xP, int yP)
    {
        x = xP; y = yP;
        return *this;
    };
};
class Point
{

public:
    char icon{ emptyChar };
    Coord coord;
    SuperObject* into{ nullptr };
    Point() : icon{ emptyChar }, coord(0, 0) {};
    Point(Coord coordP) : coord{ coordP } {};
    Point(Coord coordP, SuperObject* intoP, char iconP = emptyChar) :
        icon{ iconP }, coord(coordP), into{ intoP } {};

    Point* operator()(char iconP)
    {
        icon = iconP;
        return this;
    }

    void clear(int xP = 0, int yP = 0)
    {
        coord(0, 0);
        icon = emptyChar;
        into = nullptr;

    }
};
ostream& operator<<(ostream& out, Point& obj)
{
    return out << obj.icon;
}

class SuperObject
{
public:
    Point* place;
    char icon;
    int speed{ 1 }; // квантификатор скорости 
    bool ismov{ false }; // движется объект или нет 
    int direct{ 0 };

    char getDirectionIcon() const
    {
        switch (direct)
        {
        case 1: return '^';
        case 2: return '>';
        case 3: return 'V';
        case 4: return '<';
        default: return ' ';
        }
    }


    SuperObject() :
        place{ nullptr }, icon{ emptyChar } {}
    SuperObject(Point* placeP, char iconP = emptyChar, int speedP = 1, bool ismovP = false, int directP = 0) :
        speed{ speedP }, direct{ directP }, ismov{ ismovP }, icon{ iconP }
    {
        link(placeP);
    }

    virtual Coord* getCoord()
    {
        return &place->coord;
    }
    virtual void link(Point* p)
    {
        if (place != nullptr) place->into = nullptr;
        place = p;
        p->into = this;
    }
    virtual void delink(Point* p)
    {
        place->into = nullptr;
        place = nullptr;
    }
    virtual int collision_hanlder(SuperObject* obj)
    {
        return 0;
    };
    virtual Coord move() //возвращает координаты следующего местоположения. не меняет текущие параметры 
    {
        Coord tcoord(place->coord);
        switch (direct)
        {
        case 1:
            tcoord.y -= speed;
            break;
        case 2:
            tcoord.x += speed;
            break;
        case 3:
            tcoord.y += speed;
            break;
        case 4:
            tcoord.x -= speed;
            break;
        }
        return tcoord;
    }
};

//----- env var ----- 

const int HIGH = 10;
const int WIDTH = 10;
const char borderChar = '+';
//char emptyChar = '.'; 

int fps = 60;
int latency = 1000 / fps;

Point display[HIGH][WIDTH]{};
list<SuperObject*> objects;

char keyboardPress;
bool main_flag = true;
//===== env var ===== 
void displayClearField()
{
    for (int i = 0; i < HIGH; ++i)
    {
        for (int j = 0; j < WIDTH; ++j)
        {
            if (i == 0 || i == HIGH - 1 || j == 0 || j == WIDTH - 1)
            {
                display[i][j].icon = borderChar;
            }
            else
            {
                display[i][j].clear(j, i);
            }
        }
    }
}
void displayFill()
{
    for (int i = 0; i < HIGH; ++i)
    {
        for (int j = 0; j < WIDTH; ++j)
        {
            if (!display[i][j].into)
                display[i][j].icon = emptyChar;
            else
                display[i][j].icon = display[i][j].into->icon;
        }
    }
}


void displayOut()
{
    for (int i = 0; i < HIGH; ++i)
    {
        for (int j = 0; j < WIDTH; ++j)
        {
            if (i == 0 || i == HIGH - 1 || j == 0 || j == WIDTH - 1)
            {
                cout << borderChar << " ";
            }
            else
            {
                cout << display[i][j].icon << " ";
            }
        }
        cout << endl;
    }
}

vector<Item*> tempInventory;

class Item : public SuperObject
{
public:
    int temp = 2;

    Item() : SuperObject() {}
    Item(Point* placeP, char iconP, int tempP) :
        SuperObject(placeP, iconP), temp{ tempP } {}

    virtual int collision_hanlder(SuperObject* obj)
    {
        //your code here 
        return 1;

    }
};
class Coin : public Item
{
public:
    int amount = 1;
    Coin() : Item() {}
    Coin(Point* placeP, char iconP, int amountP) : Item(placeP, iconP = 'o', amountP) {};
};
class Weapon : public Item
{
public:
    int damage;
    Weapon(Point* placeP, char iconP, int tempP,int damage) : Item(placeP, iconP, tempP), damage(damage) {};
};
class Entity : public SuperObject
{
public:
    int life = 1;
    int damage = 1;
    char hand = '+';
    vector<Item*> inventory;

    Entity() : SuperObject() {}
    Entity(Point* placeP, char iconP, int lifeP, int damageP) :
        SuperObject(placeP, iconP), life(lifeP), damage(damageP) {};
    virtual int collision_hanlder(SuperObject* obj)
    {
        cout << typeid(*obj).name() << endl;
        cout << typeid(Entity).name() << endl;
        if (typeid(*obj) == typeid(Entity))
        {
            cout << 1;
            Entity* entity = dynamic_cast<Entity*>(obj);
            if (entity->life < 1)
            {
                Point* temp;
                temp = entity->place;
                entity->delink(temp);
                Coin *coin2 = new Coin;
                coin2->link(temp);
            }
            else if (entity->life > 0)
            {
                entity->life -= 5;
            }
        }
        else if (typeid(*obj) == typeid(Weapon))
        {
            Weapon* weapon = dynamic_cast<Weapon*>(obj);
            Point* temp;
            temp = weapon->place;
            weapon->delink(temp);
            hand = weapon->icon;
            damage += weapon->damage;
        }

        /*if (typeid(obj) == typeid(Case))
        {
            Case* box = dynamic_cast<Case*>(obj);
            tempInventory.swap(box.inventory);
        }*/
        return 1;
    }
};
class Case : public SuperObject
{
public:
    vector<Item> inventory;
    Case() : SuperObject() {}
    Case(Point* placeP, vector<Item> inv, char iconP) : SuperObject(placeP, iconP), inventory(inv) {};
};

int enemyMoved[4]{ 1,2,3,4 };
int i = 0;

int main()
{

    for (int i = 0; i < HIGH; i++)
    {
        for (int j = 0; j < WIDTH; j++)
        {
            display[i][j].coord(j, i);
        }
    };
    Entity player(&display[5][5],'@',30,5);
    Coin coin;
    vector<Item> forbox{ coin };
    Entity enemy(&display[5][7], '$', 15, 1);
    Entity enemy1(&display[2][2], '$', 15, 1);
    Entity enemy2(&display[3][7], '$', 15, 1);
    Weapon sword(&display[3][3], '!', 2, 10);
    Case box(&display[6][6], forbox,'#');

    //добавление объектов в список 
    objects.push_back(&player);
    objects.push_back(&enemy);
    objects.push_back(&sword);

    Coord tempCoord(0, 0);
    
    int turn = 1;

    while (main_flag)
    {
        // -----------STEP 1: input----------- 
        // keyboard reciver 
        keyboardPress = _getch();
        switch (keyboardPress)
        {
            // объекты двигаются через direct. если direct=0 - объект стоит.  
            // speed - это как модификатор передвижения, который показывает  
            // расстояние передвижения за один такт. по умолчанию speed=1 
        case 'w':
            player.ismov = true;
            player.direct = 1;
            player.icon = 30;
            break;
        case 'd':
            player.ismov = true;
            player.direct = 2;
            player.icon = 16;
            break;
        case 's':
            player.ismov = true;
            player.direct = 3;
            player.icon = 31;
            break;
        case 'a':
            player.ismov = true;
            player.direct = 4;
            player.icon = 17;
            break;
        case ' ':
            break;
        case 27:
            main_flag = false;  //exit 
            break;
        }

        // environment motor 
        // здесь будет логика всех объектов:  
        // исполнение каких то паттернов движения, появление, применение свойств итд 
        // в общем все, что должно произойти за этот такт 

        // Движение врагов
        if (i > 3) i = 0;
        enemy.ismov = true;
        enemy.direct = enemyMoved[i];
        i++;




        turn++;
        // ---------STEP 2: processing--------- 
        // здесь же примененные действия обрабатываются, в частности - в блоке коллизии 

        for (SuperObject* curObj : objects)
        {
            if (curObj->ismov)
            {
                tempCoord = curObj->move();
                //проверка на то, есть ли что-то в этой точке (into=nulptr - false - пустота) 
                if (display[tempCoord.y][tempCoord.x].into)
                {
                    //display[tempCoord.y][tempCoord.x].into->collision_hanlder(curObj);
                    curObj->collision_hanlder(display[tempCoord.y][tempCoord.x].into);
                }
                else
                {
                    curObj->link(&display[tempCoord.y][tempCoord.x]);
                    curObj->ismov = false;
                }
            }
        }

        // -----------STEP 3: output----------- 
        // вывод сцены на экран 
        // очистка сцены и наполнение ее 
        system("cls");
        displayFill();
        // добавление всех объектов на сцену 
        // вывод сцены на экран 
        displayOut();
        cout << keyboardPress << endl;
        Sleep(latency);
        cout << "PLAYER'S: \n" << "HP:" << player.life << "\n" << "DMG:" << player.damage << "\n" << "IN HAND:" << player.hand << "\n";
        cout << "ENEMY'S: \n" << "HP:" << enemy.life << "\n";
    }
}