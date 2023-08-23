
import random

num_row = 5

board = []

for i in range(num_row):
    board.append([])

for i in range(num_row):
    for j in range(num_row):
        board[i].append(0)
          
          

def print_board():
      for i in range(num_row):
            print(board[i])
def move(i,j):
    board[i][j] = board[i][j] + 1
    check(i,j)

def check(i,j):
    if board[i][j] == 5:
        board[i][j] = 0
        # up 
        for k in range(0, i):
                if board[i-k-1][j] != 0:
                     board[i-k-1][j] = board[i-k-1][j] + 1
                     print("transect up")
                     check(i-k-1, j)
                     break
                
        #down
        for k in range(i+1, num_row):
                if board[k][j] != 0:
                     board[k][j] = board[k][j] + 1
                     check(k, j)
                     break  
                
        #left
        for k in range(0, j):
                if board[i][j-k-1] != 0:
                     board[i][j-k-1] = board[i][j-k-1] + 1
                     check(i, j-k-1)
                     break          
        #right
        for k in range(j+1, num_row):
                if board[i][k] != 0:
                     board[i][k] = board[i][k] + 1
                     check(i, k)
                     break 
    

for i in range(0,num_row):
    for j in range(0,num_row):
        board[i][j] = int(random.random() * 5)

print_board()

while (True):
      i, j = input().split()
      move(int(i)-1,int(j)-1)
      print_board()






