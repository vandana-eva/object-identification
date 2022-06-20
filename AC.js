img="";
status="";
objects=[];

function setup()
{
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}

function preload()
{
img = loadImage('AC.jpg');
}

function draw()
{
    image=(img,0,0,500,400);
    if(status!="")
    {
        for(i=0;i<objects.length;i++)
        {
        document.getElementById("status").innerHTML="status : object Detected";
        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label + " " + percent + "%", objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    // //fill("#FF0000");
    // //text("Dog",45,75);

    // //noFill();
    // //stroke("#FF0000");
    // //rect(30,60,450,350);

    // //fill("#FF0000");
    // //text("Cat",320,120);

    // noFill();
    // stroke("#FF0000");
    // rect(300,90,270,320);
}

function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    objectDetector.detect(img,gotResult);
    gotResult();
}

function gotResult(error,results)
{
    if(error)
    {
       console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
    }
}