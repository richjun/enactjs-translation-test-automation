# enactjs-translation-test-automation
This is a tool for translation verification of enact app.

## Usage
1. Install @enact/cli

        npm install -g @enact/cli

2. Clone the code

        git clone https://github.com/richjun/enactjs-translation-test-automation.git
        cd enactjs-translation-test-automation

3. Copy all files in your enact app's resources folder to ./resources

        cp -rf yourenactapp/resources/* ./resources

4. Copy the excel file you receicved from translation company to ./excel/mms.xlsx.
Please refer to [sample](https://github.com/richjun/enactjs-translation-test-automation/blob/master/excel/mms.xlsx) for recognizable format.


5. Install dependencies

        npm install

6. If you want to disable a function ignoring period in sentence while testing, please modify IGNORE_PERIOD in .env as the below (default is true)

        IGNORE_PERIOD=false

7. Run

        npm run test / npm run start / enact test
