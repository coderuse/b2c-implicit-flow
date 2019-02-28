(function () {
    'use strict';

    function getHash(hash) {
        if (hash.indexOf("#/") > -1) {
            hash = hash.substring(hash.indexOf("#/") + 2);
        } else if (hash.indexOf("#") > -1) {
            hash = hash.substring(1);
        }
        return hash;
    }

    function decode(s) {
        var pl = /\+/g;
        return decodeURIComponent(s.replace(pl, " "));
    }

    function deserialize(query) {
        var match;
        var search = /([^&=]+)=([^&]*)/g;
        var obj = {};
        match = search.exec(query);
        while (match) {
            obj[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }
        return obj;
    }

    function isSignInProgress() {
        var result = false;

        var hash = window.location.hash;
        if (hash) {
            hash = getHash(hash);
            var parameters = deserialize(hash);
            if (parameters) {
                if (parameters.hasOwnProperty('error_description')) {
                    var errorDescription = parameters['error_description'];
                    return {
                        error: {
                            description: errorDescription
                        }
                    };
                } else if (parameters.hasOwnProperty('access_token')) {
                    return parameters['access_token'];
                }
            }
        }

        return result;
    }

    function loginRedirect(tenantName, tenantId, policyName, clientId, scope) {
        var confUri = 'https://' + tenantName + '.b2clogin.com/tfp/' + tenantId + '/' + policyName + '/v2.0/.well-known/openid-configuration';
        var xhttp = new XMLHttpRequest();
        var gotConf = false;
        xhttp.onreadystatechange = function () {
            if (this.status == 200 && this.responseText && !gotConf) {
                var response = JSON.parse(this.responseText);
                var loginUri = response.authorization_endpoint + '?';
                gotConf = true;
                setTimeout(function () {
                    var params = [];
                    params.push('client_id=' + clientId);
                    params.push('response_type=id_token token');
                    params.push('redirect_uri=' + encodeURIComponent('https://coderuse.github.io/b2c-implicit-flow/'));
                    params.push('scope=' + encodeURIComponent(scope));
                    params.push('response_mode=fragment');
                    params.push('prompt=select_account');
                    params.push('state=12345');
                    params.push('nonce=678910');
                    loginUri += params.join('&');
                    //document.getElementById('id-access-token').value = loginUri;
                    window.location.replace(loginUri);
                }, 1000);
            }
        };
        xhttp.open('GET', confUri, true);
        xhttp.send();


        var rememberMe = document.getElementById('id-remember-me').checked;
        if (rememberMe) {
            localStorage.setItem('tenantName', tenantName);
            localStorage.setItem('tenantId', tenantId);
            localStorage.setItem('policyName', policyName);
            localStorage.setItem('clientId', clientId);
            localStorage.setItem('scope', scope);
        } else {
            localStorage.clear();
        }
    }

    window.copyToClipboard = function () {
        var textarea = document.getElementById('id-access-token');
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
    };

    window.generateToken = function () {
        var tenantName = document.getElementById('id-tenant-name').value;
        var tenantId = document.getElementById('id-tenantId').value;
        var policyName = document.getElementById('id-policy-name').value;
        var clientId = document.getElementById('id-client-id').value;
        var scope = document.getElementById('id-scope').value;
        loginRedirect(tenantName, tenantId, policyName, clientId, scope);
    };

    var pTenantName = localStorage.getItem('tenantName');
    var pTenantId = localStorage.getItem('tenantId');
    var pPolicyName = localStorage.getItem('policyName');
    var pClientId = localStorage.getItem('clientId');
    var pScope = localStorage.getItem('scope');
    if (pTenantName && pTenantId && pPolicyName && pClientId && pScope) {
        document.getElementById('id-tenant-name').value = pTenantName;
        document.getElementById('id-tenantId').value = pTenantId;
        document.getElementById('id-policy-name').value = pPolicyName;
        document.getElementById('id-client-id').value = pClientId;
        document.getElementById('id-scope').value = pScope;
        document.getElementById('id-remember-me').checked = true;
    }

    var intrvl = setInterval(function () {
        var accessToken = isSignInProgress();
        if (accessToken) {
            clearInterval(intrvl);
            if (accessToken.error) {
                console.log(accessToken.error.description);
                return;
            } else {
                document.getElementById('id-access-token').value = accessToken;
                console.log(accessToken);
            }
        }
    }, 3000);
}());
