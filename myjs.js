
    
var pre,v1,v2,v3,v4,v5,v6,count=0,data;
    
function fcfs(inp, ini, final){
        var x1=[];
        var y1=[];
        var seek=0;
        x1.push(ini);
        y1.push(0);
        var a1;
        for(a1=1;a1<=inp.length;++a1){
                x1.push(inp[a1-1]);
                y1.push(-1*a1);
                if(a1==1){
                        seek=seek+Math.abs(ini-inp[a1-1]);
                }
                else{
                        seek=seek+Math.abs(inp[a1-2]-inp[a1-1]);
                }
        }
        
        var trace1 = {
                x: x1,
                y: y1,
                line: {dash: '0px 6000px',color:'black'},
                
                
        };
    
        data = [trace1];
        v1=seek;
        
    
        return [data, seek];
        
}
    
function sstf(inp, ini, final){
        var x1=[];
        var y1=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        var hold=ini;
        for(a1=1;a1<=inp.length;++a1){
                var mn=10000;
                var idx;
                for(a2=0;a2<inp.length;++a2){
                        if(visited[a2]==0){
                                if(Math.abs(hold-inp[a2])<mn){
                                        idx=a2;
                                        mn=Math.abs(hold-inp[a2]);
                                }
                        }
                }
                seek=seek+Math.abs(hold-inp[idx]);
                visited[idx]=1;
                hold=inp[idx];
                x1.push(inp[idx]);
                y1.push(-1*a1);
        }
     
        var trace1 = {
                x: x1,
                y: y1,
                line: {dash: '0px 5200px'}
        };
    
        data = [trace1];
        v2=seek;
        
        return [data,seek];
}
    
function scan(inp, ini, final, dir){
        var x1=[];
        var y1=[];
        var seek=0;
        var visited=[];
        var a1,a2;
        console.log(inp);
        for(a1=0;a1<inp.length;++a1){
                visited[a1]=0;
        }
    
        x1.push(ini);
        y1.push(0);
        inp.sort(function(a, b){return a-b});
        if((ini<inp[0])||(ini>inp[inp.length-1])){
                var scan_use = sstf(inp,ini,final);
                var data = scan_use[0];
                var seek = scan_use[1];
                seek=v2;
                v3=seek;
                return [data,seek];
        }
        if(dir=="left"){
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]<=ini){store=a1;}}
                var count=1;
                for(a1=store;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(0);
                y1.push(-1*count);
                seek=seek+hold;
                hold=0;
                ++count;
                for(a1=store+1;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
        }
        else{
                var store,hold=ini;
                for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                var count=1;
                for(a1=store;a1<inp.length;++a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
                x1.push(final);
                y1.push(-1*count);
                seek=seek+parseInt(final)-hold;
                hold=final;
                ++count;
                for(a1=store-1;a1>=0;--a1){
                        x1.push(inp[a1]);
                        y1.push(-1*count);
                        ++count;
                        seek=seek+Math.abs(hold-inp[a1]);
                        hold=inp[a1];
                }
    
        }
    
        var trace1 = {
                x: x1,
                y: y1,
                line: {dash: '0px 5200px'}
        };
    
        data = [trace1];
        v3=seek;
        console.log(seek);
        console.log(x1);
        return [data, seek];
}
    
function getBitStreamAndPlot(event, r1, ini, final, alg, side){

        count++;
        document.getElementById("here").innerHTML="<div id=\""+count+"\"></div>";

        var b = document.forms["myForm"]["bitstream-input"].value;
        var i = document.forms["myForm"]["initial-input"].value;
        if(b == ""){
                alert("Enter the Sequence of Request queue!");
                return false;
        }
        if (b!= "" && i == "") {
                alert("Enter the value of Initial Cylinder!");
                return false;
        }
    
        var inp=[],r2=r1.split(" "),r3;
        for(a1=0;a1<r2.length;++a1){
                if(r2[a1]==""){continue;}
                r3=parseInt(r2[a1]);
                inp.push(r3);
    
                if((r3>parseInt(final)) || (parseInt(ini)>parseInt(final))){
                                alert("Invalid Input: Final cylinder has to be Greater!");
                                return;
                }
        }
    
        final=parseInt(final);
        ini=parseInt(ini);
        dir=side;
        pre=1;
        
        if(alg=="fcfs"){
                var alg_use = fcfs(inp, ini, final);
                var plt_alg = "FCFS";
        }
        if(alg=="sstf"){
                var alg_use = sstf(inp, ini, final);
                var plt_alg = "SSTF";
    
        }
        if(alg=="scan"){
                var f = document.forms["myForm"]["final-input"].value;
                
                if(f == ""){
                        alert("Enter the value of Final Cylinder");
                        return false;
                }
    
                var alg_use = scan(inp, ini, final, dir);
                var plt_alg = "SCAN";
    
        }
        
        var data = alg_use[0];
        var seek = alg_use[1];
        var layout = {
                xaxis: {
                        autorange: true,
                        showgrid: true,
                        zeroline: false,
                        showline: false,
                        autotick: true,
                        ticks: 'inside',
                        showticklabels: true,
                        ticklen:"100px",
                        tickwidth:"10px",
                        
                        title: 'Cylinder Number'
                },
                yaxis: {
                        autorange: true,
                        showgrid: false,
                        zeroline: false,
                        showline: false,
                        autotick: true,
                        ticks: '',
                        
                        showticklabels: false,
                }
        };
        
        if(pre){
                Plotly.plot(count.toString(), data,layout).then(function () {
        
                        return Plotly.animate(count.toString(),
                                [{data: [{'line.dash': '5000px 0px'}]}],
                                {       frame: {duration: 10000, redraw: false},
                                transition: {duration: 10000}   }
                        );
                });
                var val = data[0].x;
                var tot_seek = "Seek-Time: ";
                for(var i=1; i<val.length; i++){
                        tot_seek = tot_seek + "|" + val[i].toString() + "-" + val[i-1].toString()  + "|" ;
                        if(i<val.length-1)
                                tot_seek = tot_seek + "+";
                        
                }
                document.getElementById("plt_alg_name").innerHTML = plt_alg;
                document.getElementById("cal-seek").innerHTML = tot_seek + " = " + seek;

                
        }
                        
}

var colors3=["#701010","#705a10","#357010","#107058","#5b1070","#701033","#102e70","#424242","#132169"];
var colorarr1=["rgb(146, 31, 31",
                "rgb(97, 74, 16",
                "rgb(39, 90, 15",
                "rgb(15, 94, 64",
                "rgb(11, 71, 77",
                "rgb(48, 21, 138",
                "rgb(126, 21, 138",
                "rgb(138, 21, 68",
                "rgb(87, 87, 87"]
document.getElementById("id").style.backgroundColor=colors3[0];
document.getElementById("header").style.backgroundColor=colors3[0];
var over=1;
var eks=document.getElementsByClassName("ek");
var dos=document.getElementsByClassName("do");
console.log(eks);
for(let w=1;w<10;w++){
        document.getElementById("c"+w.toString()).style.backgroundColor=colorarr1[w-1]+")";
        
}

for(let r=1;r<10;r++){
        document.getElementById("c"+r.toString()).addEventListener("click",
        function(){
                document.getElementById("id").style.backgroundColor=colorarr1[r-1]+")";
                document.getElementById("header").style.backgroundColor=colorarr1[r-1]+")";
                document.querySelector("#plot-button").style.backgroundColor=colorarr1[r-1]+")";
                document.querySelector("#back-button").style.backgroundColor=colorarr1[r-1]+")";
                document.querySelector("fieldset").style.backgroundColor=colorarr1[r-1]+",0.35)";
                document.querySelector("#heading").style.backgroundImage="linear-gradient(45deg,white 25%,"+colorarr1[r-1]+",0.1)"+" 50%,white 75%,"+colorarr1[r-1]+",0.1)"+" 80%)";
                for(let rt=0;rt<eks.length;rt++){
                        eks[rt].style.backgroundColor=colorarr1[r-1]+")";
                        console.log("hello");
                }
                //document.getElementById("partone").style.backgroundColor=colorarr1[r-1]+")";
                for(let et=0;et<dos.length;et++){
                        dos[et].style.backgroundColor=colorarr1[r-1]+",0.35)";
                }
        });
}
document.getElementById("id").style.backgroundColor=colorarr1[3]+")";
document.getElementById("header").style.backgroundColor=colorarr1[3]+")";
document.querySelector("#plot-button").style.backgroundColor=colorarr1[3]+")";
document.querySelector("#back-button").style.backgroundColor=colorarr1[3]+")";
document.querySelector("fieldset").style.backgroundColor=colorarr1[3]+",0.35)";
document.querySelector("#heading").style.backgroundImage="linear-gradient(45deg,white 25%,"+colorarr1[3]+",0.1)"+" 50%,white 75%,"+colorarr1[3]+",0.1)"+" 80%)";
for(let rt=0;rt<eks.length;rt++){
        eks[rt].style.backgroundColor=colorarr1[3]+")";
}
for(let et=0;et<dos.length;et++){
        dos[et].style.backgroundColor=colorarr1[3]+",0.35)";
}

var ekaur=1;
        document.getElementById("second").style.display="none";
        $(document).ready(function(){
            $("#maincolorcircle").click(function(){
                $("#time").slideToggle("slow");
            });
        });
        document.getElementById("plot-button").addEventListener("click",flipfront);
        document.getElementById("back-button").addEventListener("click",flipback);
        
        function flipfront(){ 
                document.getElementById("flip").style.transform="rotateY(180deg)";
                ekaur=2;
            }
        function flipback(){
                document.getElementById("flip").style.transform="rotateY(0deg)";
                ekaur=1;
        }
        //document.getElementById("none").addEventListener("click",anime1);
        function wikifun(){
            document.getElementById("pagewiki").style.display="flex";
            document.getElementById("pageplot").style.display="none";
        }
        //document.getElementById("ntwo").addEventListener("click",plotfun);
        function plotfun(){
            document.getElementById("pagewiki").style.display="none";
            document.getElementById("pageplot").style.display="flex";
        }
        function anime1(){}
        document.getElementById("pageplot").style.marginTop="100vh";
        document.getElementById("pageabout").style.marginTop="100vh";

        var crnt="#pagewiki",t=500;    
        
        $(document).ready(function(){
            $("#ntwo").click(function(){
                if(crnt!="#pageplot"){
                    $(crnt).animate({marginTop: '100vh'},t,function(){
                        document.querySelector(crnt).style.display="none";
                        crnt="#pageplot";
                    })
                    setTimeout(function(){
                        document.querySelector("#pageplot").style.display="flex";
                        $("#pageplot").animate({marginTop: '0vh'},t);
                    },t);
                }
            });
        });
        $(document).ready(function(){
            $("#none").click(function(){
                if(crnt!="#pagewiki"){
                    $(crnt).animate({marginTop: '100vh'},t,function(){
                        document.querySelector(crnt).style.display="none";
                        crnt="#pagewiki";
                    })
                    setTimeout(function(){
                        document.querySelector("#pagewiki").style.display="flex";
                        $("#pagewiki").animate({marginTop: '0vh'},t);
                    
                    },t);
                }
            });
        });
        $(document).ready(function(){
            $("#nthree").click(function(){
                if(crnt!="#pageabout"){
                    $(crnt).animate({marginTop: '100vh'},t,function(){
                        document.querySelector(crnt).style.display="none";
                        crnt="#pageabout";
                    })
                    setTimeout(function(){
                        document.querySelector("#pageabout").style.display="block";
                        $("#pageabout").animate({marginTop: '0vh'},t);
                    
                    },t);
                }
            });
        });
        
    function goingup(){
        $(document).ready(function(){
            $("#time").slideUp("slow");
            console.log("working");
        });
    }
                
    