#include <stdio.h>
#include <string.h>
int main(int argc, char** argv){ if(argc<2){ fprintf(stderr,"usage: %s file.csv\n",argv[0]); return 1; }
  FILE* f=fopen(argv[1],"r"); if(!f){ perror("open"); return 1; }
  char line[4096]; int row=0, errors=0; while(fgets(line,sizeof(line),f)){ row++; if(row==1) continue; if(strlen(line)<5) continue; int commas=0; for(char* p=line; *p; ++p) if(*p==',') commas++;
    if(commas<2){ fprintf(stderr,"Row %d: not enough fields\n",row); errors++; } }
  fclose(f); if(errors){ fprintf(stderr,"Found %d potential issues.\n",errors); return 2; } printf("CSV looks OK.\n"); return 0; }
