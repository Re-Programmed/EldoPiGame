const data_a = {
    data_a_fu: (id) => { return atob("aHR0cHM6Ly9tbmQ1ZGVmajg4LmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQvZ2V0P3RhYmxlPXBpY29sbGVjdGluZ2dhbWUmaWQ9") + id; },
    data_a_tu: atob("aHR0cHM6Ly90amR6ZXJqdzlmLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQ/dGFibGU9cGljb2xsZWN0aW5nZ2FtZQ=="),
    data_a_su: (id, data) => { return encodeURI(`${atob("aHR0cHM6Ly9xZHptdDFldjgyLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQvY3JlYXRlP3RhYmxlPXBpY29sbGVjdGluZ2dhbWUmaWQ9")}${id}&data=${data}`) },
    data_a_gud: async (data_a_gud_p1) => {
        const data_a_gud_fv = await fetch(data_a.data_a_fu(data_a_gud_p1));
        const data_a_gud_r = await data_a_gud_fv.json();

        if(data_a_gud_r == undefined || data_a_gud_r == null || data_a_gud_r == "" || data_a_gud_r == "null")
        {
            return null;
        }

        return { id: data_a_gud_r.id, data: JSON.parse(atob(data_a_gud_r.data)) }
    },
    data_a_gt: 0,
    data_a_gau: async () => {
        const data_a_gau_fv = await fetch(data_a.data_a_tu);
        const data_a_gau_r = await data_a_gau_fv.json();
        if(data_a_gau_r == "null" || data_a_gau_r == undefined || data_a_gau_r == null)
        {
            data_a.data_a_gt++;
            if(data_a.data_a_gt > 20){return null;}

            return await data_a.data_a_gau();
        }else{
            var data_a_gau_rv = []

            for(var i = 0; i < data_a_gau_r.Count; i++)
            {
                const data_a_gud_u = data_a_gau_r.Items[i];
                data_a_gau_rv.push({ id: data_a_gud_u.id, data: JSON.parse(atob(data_a_gud_u.data)) });
            }

            return data_a_gau_rv;
        }
    },
    data_a_sud: async (data_a_sud_jd) => {
        const data_a_sud_id = data_a_sud_jd.id;
        delete data_a_sud_jd.id; //Remove the ID so it isn't in the data string.
        const data_a_sud_d = JSON.stringify(data_a_sud_jd.data)

        const data_a_sud_fv = await fetch(data_a.data_a_su(data_a_sud_id, btoa(data_a_sud_d)));
        const data_a_sud_r = await data_a_sud_fv.json();
        return data_a_sud_r;
    }
}

const data_l = {
    data_l_uil: "Eldorado_PI_Collecting_Game_USER_ID",
    data_l_sui: (id) => {
        localStorage.setItem(data_l.data_l_uil, id);
    },
    data_l_rui: () => {
        const result = localStorage.getItem(data_l.data_l_uil);
        if(result == null || result == undefined)
        {
            return "";
        }else{
            return result;
        }
    },
    data_l_ruid: () => {
        localStorage.removeItem(data_l.data_l_uil);
    }
}