/*
 * Angular module to hold methods to call web services such as SOAP or REST
 *
 */
(function () {
    var app = angular.module("webserviceHelper", []);


    app.factory("soapService", ['$q', function ($q) {
        // Soap WSDL url
        // sample: http://host:port/soapserviceendpoint?WSDL
        this.wsdlUrl = "";
        // Soap request message
        // An xml soap envelope 
        this.soapMsg = "";
        // Type of this request, always use 'POST'
        this.soapReqType = "POST";
        // Soap response type
        this.soapResType = "xml";
        // Todo: continue defactor ...

        // FUNCTION: call BPM web service to get instances by loginName
        function asyncGetFieldCheckPermitsByUser() {
          // perform some asynchronous operation, resolve or reject the promise when appropriate.
          return $q(function(resolve, reject) {
              var mockUrl = "http://MSEDGEWIN10:8088/mocksoap12PNMUntetheredServicesSoapSoapBinding$WSDL";
              var mockUrl2 = "https://demo-machine.corp.coutureconsulting.com:9443/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL";
              var mockUrl3 = "https://bpm856pc.corp.coutureconsulting.com:9443/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL";
              var pnmurl = "https://albvbpmdev01.pnmr.internal.corp:9444/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL";
              var mockSoapReqMsg =
                  '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:pnm="http://PNMS/PNMUntetheredServices.tws">'
                   + '<soap:Header/>'
                   + '<soap:Body>'
                   + '<pnm:GetFieldCheckPermitsByUser>'
                   + '<pnm:loginName>thongh</pnm:loginName>'
                   + '</pnm:GetFieldCheckPermitsByUser>'
                   + '</soap:Body>'
                   + '</soap:Envelope>';

              var mockSoapReqMsg2 =
                  '<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">'
                   + '<Body>'
                   + '<GetFieldCheckPermitsByUser xmlns="http://PNMS/PNMUntetheredServices.tws">'
                   + '<loginName>thongh</loginName>'
                   + '</GetFieldCheckPermitsByUser>'
                   + '</Body>'
                   + '</Envelope>';

              var options = {
                  type: "POST",
                  url: mockUrl3,
                  responseType: "document",
                  data: mockSoapReqMsg2
              };
              return WinJS.xhr(options)
              .done(
              function completed(result) {
                  console.log("Successfully call SOAP to get permits instance ids by user login");
                  var $instanceIdNode = angular.element(result.response).find("instanceIDs");
                  var $items = $instanceIdNode.find("item");
                  var instanceIDs = [];
                  for (var i = 0; i < $items.length; i++) {
                      instanceIDs.push($items[i].innerHTML);
                  }
                  // Resolve the promise with the instance ids
                  console.log(instanceIDs);
                  resolve(instanceIDs);
              },
              function error(error) {
                  Windows.UI.Popups.MessageDialog("Fail to call wsdl: " + error.status + " : " + error.statusText, "Status").showAsync();
                  console.log("wsdl call error");
                  console.log(error);
                  reject(error);
              },
              function progress(progress) {
                  console.log("wsdl call in progress");
              });
          });
        }

        // FUNCTION: get instance details by instance IDs
        function asyncGetBulkInstanceDetails(instanceIDs) {
            // perform some asynchronous operation, resolve or reject the promise when appropriate.
            var url = "https://bpm856pc.corp.coutureconsulting.com:9443/rest/bpm/wle/v1/process?action=getdetails&instanceIds=";
            var instanceIDsString = "";
            for (var i = 0; i < instanceIDs.length; i++) {
                instanceIDsString = instanceIDsString.concat(instanceIDs[i]).concat(",");
            }
            instanceIDsString = encodeURIComponent(instanceIDsString);
            url = url.concat(instanceIDsString).concat("&parts=all");
            // Username and password for REST API
            var username = "deadmin";
            var password = "teamworks";
            return $q(function (resolve, reject) {    
                var options = {
                    type: "GET",
                    url: url,
                    responseType: "json",
                    headers: {
                        "Authorization": "Basic " + btoa(username + ":" + password)
                    },
                };
                return WinJS.xhr(options)
                .done(
                function completed(result) {
                    console.log("successfully call BPM REST API with WinJS");
                    console.log(result);
                    resolve(result);
                },
                function error(error) {
                    Windows.UI.Popups.MessageDialog(error.status + " : " + error.statusText, "Status").showAsync();
                    console.log("Error calling REST API to retrieve instance details");
                    console.log(error);
                    reject(error);
                },
                function progress(progress) {
                    console.log("wsdl call in progress");
                    console.log(progress);
                });
            });

        }

        return {

            getFieldCheckPermitsByUser: function () {
                // The server needs to be recognized by this Windows on which the app is running
                // In order to do so: you must add server certificates (MSEDGEWIN10, demo-machine.corp.coutureconsulting.com) onto trust store of this windows
                // Step 1: go to the server url: https://demo-machine.corp.coutureconsulting.com:9443/teamworks/webservice
                // Step 2: extract the certificate in F12 - Security, save the .cer file somewhere
                // Step 3: add to Wins root trust store: type mmc and tasks > import, choose root ca store 
                var mockUrl = "http://MSEDGEWIN10:8088/mocksoap12PNMUntetheredServicesSoapSoapBinding$WSDL";
                var mockUrl2 = "https://demo-machine.corp.coutureconsulting.com:9443/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL";
                var mockUrl3 = "https://bpm856pc.corp.coutureconsulting.com:9443/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL";
                var mockUrl4 = "http://MSEDGEWIN10:8088/mockPNMUntetheredServicesSoapSoapBinding?WSDL";
                var pnmurl = "https://albvbpmdev01.pnmr.internal.corp:9444/teamworks/webservices/PNMS/PNMUntetheredServices.tws?WSDL"
                var mockSoapReqMsg =
                    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:pnm="http://PNMS/PNMUntetheredServices.tws">'
                     + '<soap:Header/>'
                     + '<soap:Body>'
                     + '<pnm:GetFieldCheckPermitsByUser>'
                     + '<pnm:loginName></pnm:loginName>'
                     + '</pnm:GetFieldCheckPermitsByUser>'
                     + '</soap:Body>'
                     + '</soap:Envelope>';

                var soapMessage =
                    '<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">'
                     + '<Body>'
                     + '<GetFieldCheckPermitsByUser xmlns="http://PNMS/PNMUntetheredServices.tws">'
                     + '<loginName></loginName>'
                     + '</GetFieldCheckPermitsByUser>'
                     + '</Body>'
                     + '</Envelope>';

                var mockSoapReqMsg2 =
                    '<soap:Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pnm="http://PNMS/PNMUntetheredServices.tws">'
                     + '<soap:Header/>'
                     + '<soap:Body>'
                     + '<pnm:GetFieldCheckPermitsByUser>'
                     + '<pnm:loginName></pnm:loginName>'
                     + '</pnm:GetFieldCheckPermitsByUser>'
                     + '</soap:Body>'
                     + '</soap:Envelope>';

                $.ajax({
                    url: pnmurl,
                    type: "POST",
                    dataType: "xml",
                    data: mockSoapReqMsg,
                    processData: false,
                    //async: true,
                    //crossDomain: true,
                    contentType: "application/soap+xml; charset=utf-8",
                    headers: {
                    //    "Content-Type": "text/xml; charset=utf-8",
                        "Connection": "keep-alive"
                    //   "Content-Length": mockSoapReqMsg2.length,
                    //    "SOAPAction": "https://bpm856pc.corp.coutureconsulting.com:9443/teamworks/webservices/PNMS/PNMUntetheredServices.tws/GetFieldCheckPermitsByUser"
                    },
                    success: function (response) {
                        console.log("successfully use jquery to call SOAP");
                        console.log(response);
                        console.log("look for instanceIds");
                        var $instanceIdNode = $(response).find("instanceIDs");
                        var $items = $instanceIdNode.find("item");
                        console.log($items);

                    },
                    error: function (error) {
                        console.log("tesing pnm url: failed use jquery to call SOAP");
                        console.log(error);
                    }
                });
            },
    
            getFieldCheckPermitsByUser2: asyncGetFieldCheckPermitsByUser,
            getBulkInstanceDetails: asyncGetBulkInstanceDetails

        };
    }]);

})();