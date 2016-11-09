// Code goes here
(function () {
    var db;

    var req = window.msIndexedDB.open("TasksDB", 1);
    req.onerror = function () {
        console.log("Could not open database");
    };

    req.onupgradeneeded = function (evt) {
        var newDB = evt.target.result;
        newDB.createObjectStore("tasks", { keyPath: "id", autoIncrement: true });
    };

    // Load the data source with data from the database
    req.onsuccess = function () {
        db = req.result;
        var tran = db.transaction("tasks");
        tran.objectStore("tasks").openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                tasks.dataSource.insertAtEnd(null, cursor.value);
                cursor.continue();
            };
        };

    };
})();



