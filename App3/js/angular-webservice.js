/*
 * Angular module to hold methods to call web services such as SOAP or REST
 *
 */
(function () {
    var app = angular.module("webserviceHelper", []);


    app.factory("soapService", function () {
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

        return {

            getFieldCheckPermitsByUser: function () {
                var mockUrl = "http://MSEDGEWIN10:8088/mocksoap12PNMUntetheredServicesSoapSoapBinding$WSDL";
                var mockSoapReqMsg =
                    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:pnm="http://PNMS/PNMUntetheredServices.tws">'
                     + '<soap:Header/>'
                     + '<soap:Body>'
                     + '<pnm:GetFieldCheckPermitsByUser>'
                     + '<pnm:loginName>thongh</pnm:loginName>'
                     + '</pnm:GetFieldCheckPermitsByUser>'
                     + '</soap:Body>'
                     + '</soap:Envelope>';

                var soapMessage =
                    '<Envelope xmlns="http://www.w3.org/2003/05/soap-envelope">'
                     + '<Body>'
                     + '<GetFieldCheckPermitsByUser xmlns="http://PNMS/PNMUntetheredServices.tws">'
                     + '<loginName>thongh</loginName>'
                     + '</GetFieldCheckPermitsByUser>'
                     + '</Body>'
                     + '</Envelope>';
                $.ajax({
                    url: mockUrl,
                    type: "POST",
                    dataType: "xml",
                    data: mockSoapReqMsg,
                    processData: false,
                    contentType: "text/xml; charset=\"utf-8\"",
                    success: function (response) {
                        console.log("successfully use jquery to call SOAP");
                        console.log(response);
                        console.log("look for instanceIds");
                        var $instanceIdNode = $(response).find("instanceIDs");
                        var $items = $instanceIdNode.find("item");
                        console.log($items);

                    },
                    error: function (error) {
                        console.log("failed use jquery to call SOAP");
                        console.log(error);
                    }
                });
            },
    
            getFieldCheckPermitsByUser2: function () {
                var mockUrl = "http://MSEDGEWIN10:8088/mocksoap12PNMUntetheredServicesSoapSoapBinding$WSDL";
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
                    url: mockUrl,
                    responseType: "document",
                    //headers: {
                    //    "Content-Type": "text/xml; charset=utf-8",
                    //    "SOAPAction": "GetFieldCheckPermitsByUser"
                    //},
                    data: mockSoapReqMsg2
                };

                console.log("SOAP message");
                console.log(options.data);

                return WinJS.xhr(options)
                .done(
                function completed(result) {
                    console.log("successfully call SOAP with WinJS");
                    console.log(result);
                    console.log("look for instanceIds");
                    var $instanceIdNode = angular.element(result.response).find("instanceIDs");
                    var $items = $instanceIdNode.find("item");
                    console.log($items);
                },
                function error(error) {
                    Windows.UI.Popups.MessageDialog(error.status + " : " + error.statusText, "Status").showAsync();
                    console.log("wsdl call error");
                    console.log(error);
                },
                function progress(progress) {
                    console.log("wsdl call in progress");
                    console.log(progress);
                });

            }
        };
    });

})();