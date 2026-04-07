## © 2026 COPYRIGHT BY DIPPYCODER     ##
## READ LICENSE FOR MORE INFORMATIONS ##

Steps for Setup:
    1. Install NodeJS on https://nodejs.org/en/download
    2. Open 'Command Prompt'
    3. Enter 'cd' and the path to this folder: e.g. 'C:\Users\User\Desktop\overlay' 
    -> should look like this 'cd C:\Users\user\Desktop\overlay'
    4. Enter 'node install'
    5. Enter 'node server.js'
    6. Create a new 'Browser Source' in OBS Studio / Streamlabs OBS
    7. Enter this url: 'http://localhost:3000/'
    8. You can either open 'http://localhost:3000?control' in your browser or you 
    can create a Web Dock in OBS Studio, and in the url field type this in: 
    'http://localhost:3000?control'

Questions:
    - How to add stats?
        -> click on '+ Add Stat' and enter the name
    - How to check if the panel is working?
        -> Under the title is the current status
    - How to Make a 'Browser Source'?
        -> Depending on whether you are using OBS Studio or Streamlabs OBS: here are 2 tutorials:
            - https://www.youtube.com/watch?v=hwNpL0gbwv8 by YourSixStudios | OBS Studio
            - https://www.youtube.com/watch?v=0gWGIl32-cw by CreoVox | Streamlabs OBS
    - How to Make a 'Web Dock'?
        -> Depending on whether you are using OBS Studio or Streamlabs OBS: here are 2 tutorials:
            - https://youtube.com/shorts/UMNl_E7xUgI?si=Zxkxgy_MD4vTBDkT by calscreation | OBS Studio
            - https://youtu.be/VfX12T1p8Z8?si=Okz3SSJZG9-Vyatq by ReaperDigital | Streamlabs OBS
    - How to change the port?
        -> To change the port you have to change multiple things:
            - change 'const PORT = 3000;' to 'const PORT = [NEW-PORT];', this is located in server.js, line 6
            - change 'ws = new WebSocket(`${proto}://${host}:3000`);' to 'ws = new WebSocket(`${proto}://${host}:[NEW-PORT]`);', this is located in index.html, line 276
            - change 'reconnectTimer = setTimeout(connect, 3000);' to 'reconnectTimer = setTimeout(connect, [NEW-PORT]);', this is located in index.html, line 287
