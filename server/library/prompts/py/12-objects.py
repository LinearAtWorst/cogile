class Player:
    def __init__(self, name, team):
        self.name = name
        self.team = team
    def info(self):
        return self.name + ' plays for the ' + self.team

steph = Player(name='Steph', team='Warriors')
print(steph.info())