const main_dud0001 = {
    main_dud0001_0: 0,
    main_dud0001_1: {
        main_dud0001_1_0: []
    }
}

var main_ptlpd0002 = null

window.addEventListener('load', main_f1)

function main_f1()
{
    const main_f1_u_p = new URLSearchParams(window.location.search);
    var main_f1_u_gpp = main_f1_u_p.get(atob("dW5sb2Nr"));

    if(main_f1_u_gpp != null && main_f1_u_gpp != undefined && main_f1_u_gpp != "")
    {
        main_f1_u_gpp = atob(main_f1_u_gpp);
    }

    const main_f1_i = data_l.data_l_rui();
    
    if(main_f1_i == "")
    {
        main_ptlpd0002 = main_f1_u_gpp;
        main_f9();
    }else{
        data_a.data_a_gud(main_f1_i).then(main_f1_u => {
            if(main_f1_u == null)
            {
                main_ptlpd0002 = main_f1_u_gpp;
                main_f9();
                return;
            }

            if(main_f1_u_gpp != null && main_f1_u_gpp != undefined && main_f1_u_gpp != "")
            {
                for(var i = 0; i < PI_DATA.length; i++)
                {
                    if(PI_DATA[i].id_code.toString() == main_f1_u_gpp)
                    {
                        if(main_f1_u.data.collected_pi.includes(i)){break;}

                        setTimeout(main_f13, 400);

                        main_f6(i, true);
                        main_f2(main_f1_u, i)
                    }
                }
            }

            $("#user_id_display").text(`${main_f1_i} - ${main_f1_u.data.collected_pi.length} pis`)
            
            main_f4(main_f1_u)
        })

    }

    main_f7()
}

function main_f2(main_f2_p1, main_f2_p2)
{
    if(main_f2_p1.data.collected_pi.includes(main_f2_p2)){return;}
    main_f2_p1.data.collected_pi.push(main_f2_p2);
    data_a.data_a_sud(main_f2_p1).then(r => {
        main_f4(main_f2_p1)
    })
}

const main_f3 = (main_f3_p1, main_f3_p2) => { return `
                                <img src=${main_f3_p2}>
                                <p>${main_f3_p1}</p>
                                                ` }

function main_f4(main_f4_p1)
{
    //Clear collected pi display.
    $("#collected_pis").html("")

    for(var main_f4_i = 0; main_f4_i < main_f4_p1.data.collected_pi.length; main_f4_i++)
    {
        var main_f4_p = main_f4_p1.data.collected_pi[main_f4_i];

        const main_f4_pc = document.createElement("div");
        main_f4_pc.className = atob("Y29sbGVjdGVkX3Bp");
        main_f4_pc.innerHTML = main_f3(PI_DATA[main_f4_p].name, PI_DATA[main_f4_p].picture);

        main_f4_pc.setAttribute("pi_ref", main_f4_p);

        main_f4_pc.addEventListener('click', function () {
            main_f6(this.getAttribute("pi_ref"))
        })

        document.getElementById(atob("Y29sbGVjdGVkX3Bpcw==")).appendChild(main_f4_pc)
    }
}

var main_lpwa = false;

function main_f5()
{
    $("#pi_display_popup").attr("class", "hidden_popup")

    if(main_lpwa)
    {
        main_f11();
    }
}

function main_f6(main_f6_p1, main_f6_p2 = false)
{
    main_lpwa = main_f6_p2;

    $("#pi_display_popup").attr("class", "shown_popup")
    $("#pi_display_popup>h3").text(`${main_f6_p2 ? "You got: " : ""}${PI_DATA[main_f6_p1].name}${main_f6_p2 ? "!" : ""}`)
    $("#pi_display_popup>img").attr("src", PI_DATA[main_f6_p1].picture)
    $("#pi_display_popup>p").text(PI_DATA[main_f6_p1].fact)
}

function main_f7()
{
    data_a.data_a_gau().then(main_f7_u => {
        for(var i = 0; i < 10; i++)
        {
            const main_f7_ud = main_f8(main_f7_u);
            if(main_f7_ud.main_f8_h_i == -1){ return; }

            const main_f7_p = document.createElement("p");
            main_f7_p.innerText = `${(i + 1)}: ${main_f7_u[main_f7_ud.main_f8_h_i].id} \n${main_f7_u[main_f7_ud.main_f8_h_i].data.collected_pi.length} pis`;
            
            if(i == 0)
            {
                main_f7_p.style.color = "gold";
            }else if(i == 1)
            {
                main_f7_p.style.color = "silver";
            }else if(i == 2)
            {
                main_f7_p.style.color = "sandybrown";
            }
            
            main_f7_u.splice(main_f7_ud.main_f8_h_i, 1);

            document.getElementById("leaderboard").append(main_f7_p);
        }
    })
}

function main_f8(main_f8_p1)
{
    var main_f8_h = { main_f8_h_i: -1, main_f8_h_v: 0 }

    for(var main_f8_i = 0; main_f8_i < main_f8_p1.length; main_f8_i++)
    {
        if(main_f8_p1[main_f8_i].data.collected_pi.length >= main_f8_h.main_f8_h_v)
        {
            main_f8_h.main_f8_h_i = main_f8_i;
            main_f8_h.main_f8_h_v = main_f8_p1[main_f8_i].data.collected_pi.length;
        }
    }

    return main_f8_h;
}

function main_f9()
{
    $("#user_id_display").text("<no current id>")
    $("#user_id_popup").attr("class", "shown_popup");
}

function main_f10()
{
    $("#user_id_popup").attr("class", "hidden_popup");

     if(main_ptlpd0002 != null && main_ptlpd0002 != undefined && main_ptlpd0002 != "")
        {
            for(var i = 0; i < PI_DATA.length; i++)
            {
                if(PI_DATA[i].id_code.toString() == main_ptlpd0002)
                {
                    main_f13();

                    main_f6(i, true);
                }
            }
        }
}

function main_f11()
{
    for(var main_f11_i = 0; main_f11_i < 3; main_f11_i++)
    {
        setTimeout(function() {
            const main_f11_a = document.createElement("img");
            main_f11_a.className = "pi_animation";
            main_f11_a.src = "./assets/pi_animation.png";
            document.getElementById("animation_holder").appendChild(main_f11_a);

            setTimeout(function() {
                main_f11_a.remove();
            }, 3000)
        }, 250 * main_f11_i)

        setTimeout(function() {
            const main_f11_a = document.createElement("img");
            main_f11_a.className = "pi_animation";
            main_f11_a.src = "./assets/pi_animation_white.png";
            document.getElementById("animation_holder").appendChild(main_f11_a);

            setTimeout(function() {
                main_f11_a.remove();
            }, 3000)
        }, 250 * main_f11_i + 250)
    }
}

function main_f12()
{
    const main_f12_v = $("#user_id_popup>input").val()

    if(main_f12_v.length != 9 || isNaN(parseInt(main_f12_v)))
    {
        alert("Enter a valid student ID.");
        return;
    }

    $("#user_id_popup>button").text("Loading...");

    data_a.data_a_gau().then(main_f12_u => {
        for(var i = 0; i < main_f12_u.length; i++)
        {
            if(main_f12_u[i].id == main_f12_v)
            {
                alert("That student ID is in use!")

                $("#user_id_popup>button").text("Claim");
                return;
            }
        }

        var main_f12_da = main_dud0001;
        main_f12_da.main_dud0001_0 = main_f12_v;

        if(main_ptlpd0002 != null && main_ptlpd0002 != undefined && main_ptlpd0002 != "")
        {
            for(var i = 0; i < PI_DATA.length; i++)
            {
                if(PI_DATA[i].id_code.toString() == main_ptlpd0002)
                {
                    main_f12_da.main_dud0001_1.main_dud0001_1_0 = [ i ]
                }
            }
        }

        data_a.data_a_sud(main_f12_da).then(result => {
            data_l.data_l_sui(main_f12_v);
            $("#user_id_display").text(main_f12_v)
            main_f10();
            $("#user_id_popup>button").text("Claim");
            main_f4(main_f12_da);
        })
    });

}

var main_f13_PARAM = []
function main_f13()
{
    for(var i = 0; i < 200; i++)
    {
        const main_f13_c = document.createElement("div");
        main_f13_c.className = "confetti";
        main_f13_c.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        
        var main_f13_b = "#";

        if(Math.random() < 0.5){ main_f13_b += "FF"; } else { main_f13_b += "00"; }
        if(Math.random() < 0.5){ main_f13_b += "FF"; } else { main_f13_b += "00"; }
        if(Math.random() < 0.5){ main_f13_b += "FF"; } else { main_f13_b += "00"; }

        main_f13_c.style.backgroundColor = main_f13_b;
        main_f13_c.style.transform = `translate(0, ${Math.random() * 50}px)`;

        main_f13_c.style.animationDuration = `${Math.random() * 3 + 1}s`;

        document.getElementById("animation_holder").appendChild(main_f13_c);
        main_f13_PARAM.push(main_f13_c);
    }

    window.setTimeout(function () {
        while(main_f13_PARAM.length > 0)
        {
            main_f13_PARAM[main_f13_PARAM.length - 1].remove();
            main_f13_PARAM.pop();
        }
    }, 5000)
}
