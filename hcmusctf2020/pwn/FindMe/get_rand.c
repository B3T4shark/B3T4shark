#include <stdio.h>
#include <time.h>

int main() {
    int v3;
    srand(time(0));
	
    v3 = rand();

    //printf("%d\n", v3);
    fwrite(&v3, 4, 1, stdout);

    return 0;
}