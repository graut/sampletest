private class RestOperation extends AsyncTask< String, Void, Void> {

        String content;
        String error;
        ProgressDialog progressDialog = new ProgressDialog(MainActivity.this);
        String data = "";
        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            Log.i(TAG,"Please Wait1 .......................");
        }

        @Override
        protected Void doInBackground(String... params) {
            String text = "";
            BufferedReader reader=null;
            int responseCode = 0;
            // Send data
            try
            {
                String contactDetail = "{\"lead_score\":\"44\",  \"tags\":[\"tag1\", \"tag2\"], \"properties\":[{\"type\":\"SYSTEM\", \"name\":\"email\",\"value\":\"jason1987@gmail.com\"}, {\"type\":\"SYSTEM\", \"name\":\"first_name\", \"value\":\"First_name\"}, {\"type\":\"SYSTEM\", \"name\":\"last_name\", \"value\":\"Last_name\"}]}";

                Log.i(TAG,"co5 = "+contactDetail);

                // Defined URL  where to send data
                URL url = new URL("https://ghanshyam.agilecrm.com/dev/api/contacts");

                // Send POST data request

                HttpURLConnection conn = (HttpURLConnection)url.openConnection();

                final String basicAuth = "Basic " + Base64.encodeToString("ghanshyam.raut@agilecrm.com:123456".getBytes(), Base64.NO_WRAP);

                conn.setRequestProperty ("Authorization", basicAuth);
                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/json");
                conn.setRequestProperty("Accept", "application/json");
                conn.setDoOutput(true);
                conn.setDoInput(true);



                OutputStream os = conn.getOutputStream();
                os.write(contactDetail.getBytes("UTF-8"));
                os.close();



                // Get the server response

                reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                StringBuilder sb = new StringBuilder();
                String line = null;

                // Read Server Response
                while((line = reader.readLine()) != null)
                {
                    // Append server response in string
                    sb.append(line + "\n");
                }


                text = sb.toString();
            }
            catch(Exception ex)
            {

            }
            finally
            {
                try
                {

                    reader.close();
                }

                catch(Exception ex) {}
            }

            return null;
        }

        @Override
        protected void onPostExecute(Void result) {
            super.onPostExecute(result);

            progressDialog.dismiss();

            if(error !=null){
                Log.i(TAG,"Failed.......................");
            }else{
                Log.i(TAG,"Success.......................");
            }
        }
    }
