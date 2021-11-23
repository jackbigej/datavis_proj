#!/usr/bin/bash python3

import sys
import os
import csv
import glob
import re
import json



def read_older_data():
    pass

def read_data():
    path = './AllData/'

    pd = {}
            
    dist_reg = re.compile("[0-9]*'")
    free_reg = re.compile("FREE")

    for fpath in glob.glob(os.path.join(path, '*.csv')):
        with open(os.path.join(os.getcwd(), fpath), 'r') as f:
            
            csvreader = csv.reader(f)
            header = []
            header = next(csvreader)

            if '2019' not in fpath:
                home_desc = 5
                neutral_desc = 6
                player_1_name = 13
                player_1_team = 14
                player_2_name = 19
                player_2_team = 20
                score = 30
                vis_desc = 32

                season = fpath.split('.')[1].split('/')[2].split('_')[0]
                print(season)

                curr_score = ''

                for row in csvreader:
                    if row[score] != curr_score and row[player_1_name] != '':
                        curr_score = row[score]
                        desc = ''
                        if row[home_desc] != '':
                            desc = row[home_desc]
                        elif row[vis_desc] != '':
                            desc = row[vis_desc]
                        elif row[neutral_desc] != '':
                            desc = row[neutral_desc]

                        if desc == '':
                            continue

                        desc = desc.split(' ')
                        dist_key = ''
                        for i, d in enumerate(desc):
                            result = dist_reg.match(d)
                            if result != None:
                                dist_key = result.string
                            else:
                                result = free_reg.match(d)
                                if result != None:
                                    dist_key = result.string

                        if dist_key == '':
                            continue

                        if row[player_1_name] not in pd:
                            pd[row[player_1_name]] = {'Make':0, 'Miss':0, 'Total':0}
                        if season not in pd[row[player_1_name]]:
                            pd[row[player_1_name]][season] = {'Make':0, 'Miss':0, 'Total':0}
                        if (dist_key not in pd[row[player_1_name]][season]) and (dist_key != ''):
                            #print('Inserting dist_key: ' + str(dist_key) + ' for ' + row[player_1_name])
                            pd[row[player_1_name]][season][dist_key] = {'Make':0, 'Miss':0, 'Total':0}
                                
                        pd[row[player_1_name]]['Make'] += 1
                        pd[row[player_1_name]]['Total'] += 1
                        pd[row[player_1_name]][season]['Make'] += 1
                        pd[row[player_1_name]][season]['Total'] += 1
                        pd[row[player_1_name]][season][dist_key]['Make'] += 1
                        pd[row[player_1_name]][season][dist_key]['Total'] += 1
                
                    else:
                        desc = ''
                        if row[home_desc] != '':
                            desc = row[home_desc]
                        elif row[vis_desc] != '':
                            desc = row[vis_desc]
                        elif row[neutral_desc] != '':
                            desc = row[neutral_desc]

                        if desc == '':
                            continue

                        desc = desc.split(' ')

                        if desc[0] == 'MISS':
                            dist_key = ''
                            for i, d in enumerate(desc):
                                result = dist_reg.match(d)
                                if result != None:
                                    dist_key = result.string
                                else:
                                    result = free_reg.match(d)
                                    if result != None:
                                        dist_key = result.string

                            if dist_key == '':
                                continue

                            if row[player_1_name] not in pd:
                                pd[row[player_1_name]] = {'Make':0, 'Miss':0, 'Total':0}
                            if season not in pd[row[player_1_name]]:
                                pd[row[player_1_name]][season] = {'Make':0, 'Miss':0, 'Total':0}
                            if (dist_key not in pd[row[player_1_name]][season]) and (dist_key != ''):
                                #print('Inserting dist_key: ' + str(dist_key) + ' for ' + row[player_1_name])
                                pd[row[player_1_name]][season][dist_key] = {'Make':0, 'Miss':0, 'Total':0}

                            pd[row[player_1_name]]['Miss'] += 1
                            pd[row[player_1_name]]['Total'] += 1
                            pd[row[player_1_name]][season]['Miss'] += 1
                            pd[row[player_1_name]][season]['Total'] += 1
                            pd[row[player_1_name]][season][dist_key]['Miss'] += 1
                            pd[row[player_1_name]][season][dist_key]['Total'] += 1

    print(pd)
    with open('all-years-data.json', 'w') as f2:
        json.dump(pd, f2)
                
                
            
    

def main():
    read_data()

if __name__ == "__main__":
    main()
