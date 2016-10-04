begin{

count=0

}{


count++;

if($0 != ""){
	printf("%s/%s\n",$pwd , $0);  

}

}END{


printf("\n");   


}