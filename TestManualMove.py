import json
import sys
import time
import gclib
import os

from tempfile import mkstemp
from shutil import move, copymode
from os import fdopen, remove

path = os.path.abspath(os.path.dirname(__file__))
g = gclib.py()
g.GOpen('192.168.50.225 --direct')
c = g.GCommand
eje = sys.argv[1].upper()
coord = sys.argv[2]

Pattern = 'PR' + eje + '='
Subst = 'PR' + eje + '=' + coord
Path = path+'/../preProgramas/manual' + eje + '.txt'




def replace(file_path, pattern, subst):
    #Create temp file
    fh, abs_path = mkstemp()
    with fdopen(fh,'w') as new_file:
        with open(file_path) as old_file:
            for line in old_file:
                if(line.startswith(pattern)):
                    new_file.write(subst + '\n')
                else:
                    new_file.write(line)
    copymode(file_path, abs_path)
    remove(file_path)
    move(abs_path, file_path)


replace(Path, Pattern, Subst)

g.GProgramDownloadFile(path+'/../preProgramas/manual' + eje + '.txt')
c('XQ')
g.GClose()
body = {'status':'OK'}
JSON = json.dumps(body)
print(JSON)
