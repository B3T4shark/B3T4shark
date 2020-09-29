#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int v0;

int main() {
	int v3;
	printf("size of int: %d\n", sizeof(v0));
	for (int i = 0; i < 3; i++) {
		v0 = time(0);
		printf("v0: %d\n", v0);
		srand(v0);
		v3 = rand();
		printf("Test srand(time(0)) #%d: %d\n", i + 1, v3);
	}
	return 0;
}


