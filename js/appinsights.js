(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
        var cols = [{
            id: "id",
            alias: "ID",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "timestamp",
            alias: "Timestamp",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "count",
            alias: "Count",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "type",
            alias: "Item Type",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "Event",
            dataType: tableau.dataTypeEnum.string,
        }, {
            id: "application",
            alias: "Application Version",
            dataType: tableau.dataTypeEnum.string,
        }, {
            id: "clientType",
            alias: "Client Type",
            dataType: tableau.dataTypeEnum.string,
        }, {
            id: "clientModel",
            alias: "Model",
            dataType: tableau.dataTypeEnum.string,
        }];

        var tableSchema = {
            id: "customEvents",
            alias: "Custom Events",
            columns: cols
        };
        schemaCallback([tableSchema]);
    };

    myConnector.getData = function (table, doneCallback) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.applicationinsights.io/v1/apps/ec97721d-9a9e-4a58-809c-86e95fe746b7/events/customEvents",
            "method": "GET",
            "headers": {
                "x-api-key": "j26amtnx8eml0jhg4sdf37tntc3a1kbkptfuqsdq",
                "Cache-Control": "no-cache"
            }
        };

        $.ajax(settings).done(function (resp) {
            console.log(resp);
            var feat = resp.value,
                tableData = [];
            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "timestamp": feat[i].timestamp,
                    "count": feat[i].count,
                    "type": feat[i].type,
                    "name": feat[i].customEvent.name,
                    "application": feat[i].application.version,
                    "clientType": feat[i].client.type,
                    "clientModel": feat[i].client.model
                });
            }
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Custom Events";
            tableau.submit();
        });
    });
})();