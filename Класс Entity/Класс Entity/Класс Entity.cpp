using namespace std;
#include <vector>
#include <iostream>
#include <random>

class Entity
{
public:
    vector<int> bag;
    int life;
    int damage;

    Entity() : life(1), damage(1), bag{ 1,2,3 }
    {
        cout << "HP:" << life << " " << "DMG:" << damage << "LOOT:";
        for (int i = 0; i << 3; i++) { cout << bag[i]; }
    };

    Entity(int lifeP, int damageP, int bagsize) : life(lifeP), damage(damageP) 
    { 
        for (int i = 0; i < bagsize; i++) { bag[i] = i + 1;} 
        for (int i = 0; i << 3; i++) { cout << bag[i]; }
    };

    Entity(const Entity& e) : bag(e.bag), life(e.life), damage(e.damage) {};

    Entity(Entity&& e) : bag(move(e.bag)), life(move(e.life)), damage(move(e.damage)) {};

    ~Entity() {};

    void setlife(int lifeP) { life = lifeP; };
    void setdamage(int dmgP) { damage = dmgP; };
    void setbag(const vector<int>& newbag ) { bag = newbag; };
};

Entity bagLoader(int bagsize)
{
    Entity entity;
    random_device rd;
    mt19937 gen(rd());
    uniform_int_distribution<> dis(1, 100);

    for (int i = 0; i < bagsize; i++) 
    {
        entity.bag.push_back(dis(gen));
    }
}

class Human : public Entity
{
    int intelligence;
    int thinking() { return damage * (0, 01 * intelligence); }
};

class Monster : public Entity
{
    int scary;
    int thinking() { return damage * scary; }
};

class Friend : public Entity
{
    int friendship;
    int healing(Human& human) { return human.life + 0, 01 * friendship; }
};
int main()
{
    
}
