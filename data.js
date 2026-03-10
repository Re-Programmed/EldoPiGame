const API = {
    FetchURL: (id) => { return atob("aHR0cHM6Ly9tbmQ1ZGVmajg4LmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQvZ2V0P3RhYmxlPXBpY29sbGVjdGluZ2dhbWUmaWQ9") + id; },
    TableURL: atob("aHR0cHM6Ly90amR6ZXJqdzlmLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQ/dGFibGU9cGljb2xsZWN0aW5nZ2FtZQ=="),
    SetURL: (id, data) => { return encodeURI(`${atob("aHR0cHM6Ly9xZHptdDFldjgyLmV4ZWN1dGUtYXBpLnVzLXdlc3QtMi5hbWF6b25hd3MuY29tL2RlZmF1bHQvY3JlYXRlP3RhYmxlPXBpY29sbGVjdGluZ2dhbWUmaWQ9")}${id}&data=${data}`) },
    GetUserData: async (id) => {
        const fetchVal = await fetch(API.FetchURL(id));
        const result = await fetchVal.json();

        if(result == undefined || result == null || result == "" || result == "null")
        {
            return null;
        }

        return { id: result.id, data: JSON.parse(atob(result.data)) }
    },
    GetTries: 0,
    GetAllUsers: async () => {
        const fetchVal = await fetch(API.TableURL);
        const result = await fetchVal.json();
        if(result == "null" || result == undefined || result == null)
        {
            API.GetTries++;
            if(API.GetTries > 20){return null;}

            return await API.GetAllUsers();
        }else{
            var resultingVals = []

            for(var i = 0; i < result.Count; i++)
            {
                const user = result.Items[i];
                resultingVals.push({ id: user.id, data: JSON.parse(atob(user.data)) });
            }

            return resultingVals;
        }
    },
    SetUserData: async (jsonData) => {
        const id = jsonData.id;
        delete jsonData.id; //Remove the ID so it isn't in the data string.
        const data = JSON.stringify(jsonData.data)

        const fetchVal = await fetch(API.SetURL(id, btoa(data)));
        const result = await fetchVal.json();
        return result;
    }
}

const LOCAL = {
    UserIDLocation: "Eldorado_PI_Collecting_Game_USER_ID",
    SaveUserID: (id) => {
        localStorage.setItem(LOCAL.UserIDLocation, id);
    },
    RetrieveUserID: () => {
        const result = localStorage.getItem(LOCAL.UserIDLocation);
        if(result == null || result == undefined)
        {
            return "";
        }else{
            return result;
        }
    },
    RemoveUserID: () => {
        localStorage.removeItem(LOCAL.UserIDLocation);
    }
}