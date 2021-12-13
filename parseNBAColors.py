#!/usr/bin/env python3

import sys
import requests
import re
import json

def main():

    '''
    r = requests.get("https://teamcolorcodes.com/nba-team-color-codes/", auth=('user', 'pass'))

    with open("colorCodesHTML.txt", "w+") as f:
        f.write(r.text)
    '''

    nba_teams_abe = {}
    with open('nbaAb.txt', 'r') as f:
        line = f.readline()
        while line:
            line = [l.strip() for l in line.split('-')]
            print(line)
            nba_teams_abe[line[1]] = line[0]
            line = f.readline()

    table_reg = re.compile("<caption><strong> NBA HEX Color Codes Table </strong></caption>")
    team_header = re.compile('<th scope=\"row\">')
    end_team = re.compile('</tr>')
    color_regex = re.compile('#[A-Za-z0-9_-]*')

    team_color_dict = {}
    
    with open('colorCodesHTML.txt', 'r') as f:

        line = f.readline()
        while line:
            if table_reg.match(line):
                line = f.readline()
                while line:
                    if team_header.match(line):
                        team_name = line.split(' ')[2:]
                        team_name.pop(-1)
                        team_name = ' '.join(team_name)
                        team_name = nba_teams_abe[team_name]
                        team_color_dict[team_name] = []
                        line = f.readline()
                        while line:
                            if end_team.match(line):
                                break

                            line = line.split(' ')
                            if len(line) > 2:
                                for chunk in line:
                                    if color_regex.match(chunk):
                                        print(chunk[0:7])
                                        if chunk[0:7] == "#FFFFFF":
                                            chunk = '#FFFDD0'
                                        team_color_dict[team_name].append(chunk[0:7])
                                        with open("teamColors.json", "w+") as f2:
                                            f2.write(json.dumps(team_color_dict))

                            line = f.readline()


                    line = f.readline()
                

                
            line= f.readline()


    with open('teamColors.json', 'r') as f:
        json_file = json.loads(f.readline())
        print(json_file)

    print(nba_teams_abe)
            
    

if __name__ == '__main__':
    main()