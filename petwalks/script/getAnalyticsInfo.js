const analyticsAdmin = require('@google-analytics/admin');

const keyFilePath = '/service_credentials.json'; 

const analyticsAdminClient = new analyticsAdmin.AnalyticsAdminServiceClient({
    keyFilename: keyFilePath,
});

const accountId = '448397801';

async function getAccountInfo() {
    try {
        const request = {
            name: `accounts/${accountId}`,
        };
        const [response] = await analyticsAdminClient.getAccount(request);

        console.log('Account Information:');
        console.log('Account name:', response.name);
        console.log('Display name:', response.displayName);
        console.log('Region code:', response.regionCode);
        console.log('Create time:', response.createTime.toDate());
        console.log('Update time:', response.updateTime.toDate());
    } catch (error) {
        console.error('Error retrieving account information:', error);
    }
}

getAccountInfo();
