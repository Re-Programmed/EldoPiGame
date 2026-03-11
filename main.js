const DEFAULT_USER_DATA = {
    id: 0,
    data: {
        collected_pi: []
    }
}

var PlannedToLoadPiDisplay = null

window.addEventListener('load', Load)

function Load()
{
    const urlParams = new URLSearchParams(window.location.search);
    var gotPiParam = urlParams.get('unlock');

    if(gotPiParam != null && gotPiParam != undefined && gotPiParam != "")
    {
        gotPiParam = atob(gotPiParam);
    }

    const id = LOCAL.RetrieveUserID();
    
    if(id == "")
    {
        PlannedToLoadPiDisplay = gotPiParam;
        CreateUserIDPopup();
    }else{
        API.GetUserData(id).then(user => {
            if(user == null)
            {
                PlannedToLoadPiDisplay = gotPiParam;
                CreateUserIDPopup();
                return;
            }

            if(gotPiParam != null && gotPiParam != undefined && gotPiParam != "")
            {
                for(var i = 0; i < PI_DATA.length; i++)
                {
                    if(PI_DATA[i].id_code.toString() == gotPiParam)
                    {
                        if(user.data.collected_pi.includes(i)){break;}

                        //Play confetti effect!
                        setTimeout(Confetti, 400);

                        //TODO: Check if you already have the PI.

                        //Show pi.
                        ClickPi(i, true);
                        GrantPi(user, i)
                    }
                }
            }

            $("#user_id_display").text(`${id} - ${user.data.collected_pi.length} pis`)
            
            LoadCollectedPi(user)
        })

    }

    CreateLeaderboard()
}

//Gives the specified user the specified id of pi on the API.
function GrantPi(user, id)
{
    if(user.data.collected_pi.includes(id)){return;}
    user.data.collected_pi.push(id);
    API.SetUserData(user).then(result => {
        //Refresh collected pis.
        LoadCollectedPi(user)
    })
}

const GetCollectedPiHTML = (piName, piImage) => { return `
                                <img src=${piImage}>
                                <p>${piName}</p>
                                                ` }

function LoadCollectedPi(user)
{
    //Clear collected pi display.
    $("#collected_pis").html("")

    for(var i = 0; i < user.data.collected_pi.length; i++)
    {
        var pi = user.data.collected_pi[i];

        const piContainer = document.createElement("div");
        piContainer.className = "collected_pi"
        piContainer.innerHTML = GetCollectedPiHTML(PI_DATA[pi].name, PI_DATA[pi].picture);

        piContainer.setAttribute("pi_ref", pi);

        piContainer.addEventListener('click', function () {
            ClickPi(this.getAttribute("pi_ref"))
        })

        document.getElementById("collected_pis").appendChild(piContainer)
    }
}

var LastPiWasAward = false;

function ClosePiPopup()
{
    $("#pi_display_popup").attr("class", "hidden_popup")

    if(LastPiWasAward)
    {
        PiAnimation();
    }
}

function ClickPi(id, isAward = false)
{
    LastPiWasAward = isAward;

    $("#pi_display_popup").attr("class", "shown_popup")
    $("#pi_display_popup>h3").text(`${isAward ? "You got: " : ""}${PI_DATA[id].name}${isAward ? "!" : ""}`)
    $("#pi_display_popup>img").attr("src", PI_DATA[id].picture)
    $("#pi_display_popup>p").text(PI_DATA[id].fact)
}

function CreateLeaderboard()
{
    API.GetAllUsers().then(users => {
        for(var i = 0; i < 10; i++)
        {
            const userData = GetHighestUser(users);
            if(userData.index == -1){ return; }

            const placing = document.createElement("p");
            placing.innerText = `${(i + 1)}: ${users[userData.index].id} \n${users[userData.index].data.collected_pi.length} pis`;
            
            if(i == 0)
            {
                placing.style.color = "gold";
            }else if(i == 1)
            {
                placing.style.color = "silver";
            }else if(i == 2)
            {
                placing.style.color = "sandybrown";
            }
            
            users.splice(userData.index, 1);

            document.getElementById("leaderboard").append(placing);
        }
    })
}

/*
    index: int,
    value: int
*/
function GetHighestUser(users)
{
    var highest = { index: -1, value: 0 }

    for(var i = 0; i < users.length; i++)
    {
        if(users[i].data.collected_pi.length >= highest.value)
        {
            highest.index = i;
            highest.value = users[i].data.collected_pi.length;
        }
    }

    return highest;
}

function CreateUserIDPopup()
{
    $("#user_id_display").text("<no current id>")

    //LOCAL.RemoveUserID();
    $("#user_id_popup").attr("class", "shown_popup");
}

function CloseUserIDPopup()
{
    $("#user_id_popup").attr("class", "hidden_popup");

     if(PlannedToLoadPiDisplay != null && PlannedToLoadPiDisplay != undefined && PlannedToLoadPiDisplay != "")
        {
            for(var i = 0; i < PI_DATA.length; i++)
            {
                if(PI_DATA[i].id_code.toString() == PlannedToLoadPiDisplay)
                {
                    //Play confetti effect!
                    Confetti();

                    //Show pi.
                    ClickPi(i, true);
                }
            }
        }
}

function PiAnimation()
{
    for(var i = 0; i < 3; i++)
    {
        setTimeout(function() {
            const animating = document.createElement("img");
            animating.className = "pi_animation";
            animating.src = "./assets/pi_animation.png";
            document.getElementById("animation_holder").appendChild(animating);

            setTimeout(function() {
                animating.remove();
            }, 3000)
        }, 250 * i)

        setTimeout(function() {
            const animating = document.createElement("img");
            animating.className = "pi_animation";
            animating.src = "./assets/pi_animation_white.png";
            document.getElementById("animation_holder").appendChild(animating);

            setTimeout(function() {
                animating.remove();
            }, 3000)
        }, 250 * i + 250)
    }
}

function UpdateStudentID()
{
    const value = $("#user_id_popup>input").val()

    if(value.length != 9 || isNaN(parseInt(value)))
    {
        alert("Enter a valid student ID.");
        return;
    }

    $("#user_id_popup>button").text("Loading...");

    var previousUserData = null;

    API.GetAllUsers().then(users => {
        for(var i = 0; i < users.length; i++)
        {
            if(users[i].id == value)
            {
               // alert("That student ID is in use!")

                previousUserData = users[i];
                console.log(previousUserData);
                break;
               // $("#user_id_popup>button").text("Claim");
              //  return;
            }
        }

        var data = previousUserData == null ? DEFAULT_USER_DATA : previousUserData;
        data.id = value;

        if(PlannedToLoadPiDisplay != null && PlannedToLoadPiDisplay != undefined && PlannedToLoadPiDisplay != "")
        {
            for(var i = 0; i < PI_DATA.length; i++)
            {
                if(PI_DATA[i].id_code.toString() == PlannedToLoadPiDisplay)
                {
                    data.data.collected_pi.push(i);
                }
            }
        }

        API.SetUserData(data).then(result => {
            LOCAL.SaveUserID(value);
            $("#user_id_display").text(value)
            CloseUserIDPopup();

            //Reset button text just in case.
            $("#user_id_popup>button").text("Claim");

            console.log(data)

            LoadCollectedPi(data);
        })
    });

}

var activeConfetti = []
function Confetti()
{
    for(var i = 0; i < 200; i++)
    {
        const confettiPiece = document.createElement("div");
        confettiPiece.className = "confetti";
        confettiPiece.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        
        var bgColor = "#";

        if(Math.random() < 0.5){ bgColor += "FF"; } else { bgColor += "00"; }
        if(Math.random() < 0.5){ bgColor += "FF"; } else { bgColor += "00"; }
        if(Math.random() < 0.5){ bgColor += "FF"; } else { bgColor += "00"; }

        confettiPiece.style.backgroundColor = bgColor;
        confettiPiece.style.transform = `translate(0, ${Math.random() * 50}px)`;

        confettiPiece.style.animationDuration = `${Math.random() * 3 + 1}s`;

        document.getElementById("animation_holder").appendChild(confettiPiece);
        activeConfetti.push(confettiPiece);
    }

    window.setTimeout(function () {
        while(activeConfetti.length > 0)
        {
            activeConfetti[activeConfetti.length - 1].remove();
            activeConfetti.pop();
        }
    }, 5000)
}
