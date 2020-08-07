# EDAS Console

Repository for EDAS Console

# Running DjangoAPIs

1. Navigate to `/server`
2. Run following command on **Mac OS** Terminal to activate the virtual enviornment (command for other **Operating Systems** will be different) and install the dependencies

```
pip install virtualenv
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```
 
 (If pip is not installed, follow https://pip.pypa.io/en/stable/installing/ )

 
3. Navigate to `/djangoapi` and run the following command to run the server

```
python manage.py runserver
```
Note down the address on which server has been started on.

For `djangoadmin` username and password is:

**Username:** admin

**Password:** admin123

# Running the Frontend

1. Navigate to `/client` directory.
2. Run the following command in terminal
```
npm install
```
3. Run the following command to start server
```
npm run start
```

### To build frontend code for deployment
Run following command in terminal

```
npm run build
```
this will create a `build` directory inside `/client`, contents of which can be deployed on any server.

### To configure API hostnames for frontend

Currently React App looks for `http://127.0.0.1:8000` to make API Calls. If your Django APIs are also started on this server then there is no need to do any changes in the axios interceptor.

In-case it is different, to change this navigate to file `client/src/utils/axios.js` and change `axios.defaults.baseURL` to your requirement.

Make sure, there is not `/` at the end of the URL you are adding in the axios interceptor

Make sure, on production this URL should point to the hostname of production server of Django APIs.

