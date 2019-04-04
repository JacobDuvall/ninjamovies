//******************************************************************************

// Modify this file to generate HTML for the accordion items on your main page.
// See https://www.w3schools.com/js/ for reference and help.

//******************************************************************************

// We would normally use an HTTP request to fetch the XML data from a file on a
// remote server. Access control disallows that on local files. As a workaround,
// we inline the XML as a JavaScript string that we can parse directly.

// Function to fetch XML over HTTP. We're NOT using this one, but worth seeing.
// See https://www.w3schools.com/xml/xml_http.asp for more information.
function loadXMLDataHttp()
{
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            loadXMLData(this.responseXML);
        }
    };

    xhttp.open("GET", "data.xml", true);
    xhttp.send();
}

// Function to fetch XML inline. We ARE using this one.
// See https://www.w3schools.com/xml/xml_parser.asp for more information.
function loadXMLDataInline()
{
    var parser = new DOMParser;
    var xml = parser.parseFromString(inlineXML, "text/xml");

    loadXMLData(xml);
}

// Function to process XML into HTML and event handlers.
function loadXMLData(xml)
{
    var items = xml.getElementsByTagName("ITEM");

    insertAccordion(items);
    activateAccordion(items);

    var years = xml.getElementsByTagName("YEAR");

    insertFilter(years);
    activateFilter();
}

// Convenience function to extract the value of a tag from the XML.
// See https://www.w3schools.com/xml/ for more information.
function getItemTagValue(item, tag)
{
    return item.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
}

//******************************************************************************

// Inlined version of our XML data for use by loadXMLDataInline().
// See data.xml for the same XML in a format that is easier to read.
var inlineXML = "<DATA><ITEM><ID>American_Ninja</ID><IMDB>tt0088708</IMDB><TITLE>American Ninja</TITLE><GENRE>Badass Ninja Movie</GENRE><DESCRIPTION>American soldier, obviously very skilled in martial arts, single-handedly takes on mercenaries in the Philippines.</DESCRIPTION><YEAR>(1985)</YEAR><DURATION>1:35:00</DURATION></ITEM><ITEM><ID>American_Ninja_2</ID><IMDB>tt0092548</IMDB><TITLE>American Ninja 2: The Confrontation</TITLE><GENRE>Badass Ninja Movie</GENRE><DESCRIPTION>On a remote Caribbean island, Army Ranger Joe Armstrong investigates the disappearance of several marines, which leads him to The Lion, a super-criminal who has kidnapped a local scientist and mass-produced an army of mutant Ninja warriors.</DESCRIPTION><YEAR>(1987)</YEAR><DURATION>1:30:00</DURATION></ITEM><ITEM><ID>American_Ninja_3</ID><IMDB>tt0096804</IMDB><TITLE>American Ninja 3: Blood Hunt</TITLE><GENRE>Badass Ninja Movie</GENRE><DESCRIPTION>Jackson is back, and now he has a new partner, karate champion Sean, as they must face a deadly terrorist known as The Cobra, who has infected Sean with a virus. Sean and Jackson have no choice but to fight the Cobra and his bands of ninjas.</DESCRIPTION><YEAR>(1989)</YEAR><DURATION>1:29:00</DURATION></ITEM><ITEM><ID>American_Ninja_4</ID><IMDB>tt0101326</IMDB><TITLE>American Ninja 4: The Annihilation</TITLE><GENRE>Badass Ninja Movie</GENRE><DESCRIPTION>The two American Ninjas, Joe Armstrong and Sean Davidson, team up to do battle against a terrorist and his band of Ninjas.</DESCRIPTION><YEAR>(1990)</YEAR><DURATION>1:39:00</DURATION></ITEM><ITEM><ID>American_Ninja_5</ID><IMDB>tt0106257</IMDB><TITLE>American Ninja 5</TITLE><GENRE>Badass Ninja Movie</GENRE><DESCRIPTION>When a scientists daughter is kidnapped, American Ninja (David Bradley), attempts to find her, but this time he teams up with a youngster he has trained in the ways of the ninja.</DESCRIPTION><YEAR>(1993)</YEAR><DURATION>1:42:00</DURATION></ITEM></DATA>";

//******************************************************************************

// Function to build HTML from the XML data and insert it into the id=accordion
// <div> element in main.html. Creates a pair of <div>s for each data item: one
// for a summary and one for details.
function insertAccordion(items)
{
    var s = "";

    // ***TODO: Modify the generation of HTML below to match your design.
    // Make sure you know what you're doing! If possible, make all of your
    // modifications through CSS (in style.css).

    // Loop through the ITEMs in the data
    for (var i = 0; i < items.length; i++)
    {
        var itemID = getItemTagValue(items[i], "ID");
        var overallID = "overall-" + itemID;
        var summaryID = "summary-" + itemID;
        var detailsID = "details-" + itemID;

        var itemYear = "year" + getItemTagValue(items[i], "YEAR");

        // Open a <div> block for the item overall.
        // (Use #itemID in an href to link to this <div> on the main page.)
        s += "<div class=\"item-overall " + itemYear + "\" id=\"" + overallID + "\">";

        // Build a <div> block for the item summary.
        s += "<div class=\"item-summary\" id=\"" + summaryID + "\">";
        s += buildItemSummary(items[i]);
        s += "</div>";

        // Build a <div> block for the item details.
        s += "<div class=\"item-details\" id=\"" + detailsID + "\">";
        s += buildItemDetails(items[i]);
        s += "</div>";

        // Close the <div> block for the item overall.
        s += "</div>";
    }

    // Insert the built HTML into the id=accordion <div> in main.html.
    document.getElementById("items").innerHTML = s;
}

// After inserting the <div>s, add a click event listener to each summary to
// show/hide the corresponding details. Also add hooks to expand/collapse all.
function activateAccordion(items)
{
    // Again, loop through the ITEMs in the data
    for (var i = 0; i < items.length; i++)
    {
        var itemID = getItemTagValue(items[i], "ID");
        var summaryID = "summary-" + itemID;

        // Add a click listener to the item summary. When clicked, toggle the
        // sibling element, which we've set up to be the corresponding details.
        $("#" + summaryID).click(function(){ $(this).next().slideToggle(); });
    }

    // Event listeners for elements to expand/collapse all items.
    $("#show-all").click(function(){ $("[id^='details-']").slideDown(); });
    $("#hide-all").click(function(){ $("[id^='details-']").slideUp(); });
}

// Function to build HTML to display the summary of a data item. Complete this
// to implement the "collapsed items" aspect of the main page specification.
function buildItemSummary(item)
{
    var s = "";

    // ***TODO: Concatenate strings to build the summary HTML for an item.

    // Here is an example to get you started...

    // ...read the item's ID from the XML...
    var itemID = getItemTagValue(item, "ID");
    var itemTitle = getItemTagValue(item, "TITLE");
    var itemYear = getItemTagValue(item, "YEAR");
    // ...and append it, followed by a line break.
    s += itemTitle + " " +  itemYear + "<br\>"
    

    return s;
}

// Function to build HTML to display the details of a data item. Complete this
// to implement the "expanded items" aspect of the main page specification.
function buildItemDetails(item)
{
    var s = "";

    // ...read some values from the XML...
    var itemID = getItemTagValue(item, "ID");
    var itemURL = getItemTagValue(item, "IMDB");
    var itemDuration =  getItemTagValue(item, "DURATION");
    var itemDescription = getItemTagValue(item, "DESCRIPTION");
    var itemGenre = getItemTagValue(item, "GENRE");
    var itemTitle = getItemTagValue(item, "TITLE");
    var itemYear = getItemTagValue(item, "YEAR");



    // ...put everything into a block...
    s += "<div id = \"left1\">";

    // ...first the movie poster (made small), followed by a line break...
    // (The image sizing should probably be in CSS.)
    s += "<a href = \"items/0003.html\"> <img src=\"images/" + itemID + ".jpg\"" +
    "width=\"160px;\"" + " style = \"float:left;></a>" + "<br/>";

    // ...then a link to the movie on IMDB...
    // (IMDB's URL format for movies is https://www.imdb.com/title/tt#######/.)
    
    s += "<a href=\"http://www.imdb.com/title/" + itemURL + "/\">" +
    "See on IMDB" + "</a>" + "<br/>";
    
        s += "<div id = \"right1\">" + "<p align = \"left\">";

    // add all the details of the movie info
    s += "<p style = \"text-align:center\">" + "Title: " + itemTitle + "</br>"
    
    s += "<p style = \"text-align:center\">" + "Year: " + itemYear + "</br>"
    
    s += "<p style = \"text-align:center\">" + "Duration: " + itemDuration + "</br>"
    
    s += "<p style = \"text-align:center\">" + "Genre: " + itemGenre + "</br>"
    
    s += "<p style = \"text-align:center\">" + "Description: " + itemDescription + "</br>"
    
    s += "<a href=\"items/0003.html\">" +
    "MORE INFO" + "</a>" + "<br/>";
    

    

    // ...and finally close the block.
    s += "</div> </p> </div>";
    

    return s;
}

//******************************************************************************

// Function to build HTML from the XML data and insert it into the id=filter
// <div> element in main.html. Creates a <form> with checkbox <input>s for each
// unique year in the data.
function insertFilter(years)
{
    var s = "";
    var y = new Array();

    for (var i = 0; i < years.length; i++)
    {
        y.push(years[i].childNodes[0].nodeValue);
    }

    // Sort and remove duplicates
    y = y.sort().filter(function(v, i, a) {
        return ((i == a.length - 1) || (a[i + 1] != v));
    });

    // ***TODO: Modify the generation of HTML below to match your design.
    // Make sure you know what you're doing! If possible, make all of your
    // modifications through CSS (in style.css).

    s += "<form>";

    // Loop through the (sorted, unique) year values extracted from the data
    for (var i = 0; i < y.length; i++)
    {
        // Build a <input> checkbox for the year.
        s += "<input type=\"checkbox\" value=\"year" + y[i] +
            "\" checked> " + y[i] + "<br/>";
    }

    s += "</form>";

    // Insert the built HTML into the id=accordion <div> in main.html.
    document.getElementById("filter").innerHTML = s;
}

// After inserting the <form>, add a click event listener to each checkbox to
// filter the corresponding items in the accordion by year..
function activateFilter()
{
    $("div#filter").find("input:checkbox").on("click", function() {
        $("[id^='overall-']").hide();
        $("div#filter").find('input:checked').each(function() {
            $("[class*='" + $(this).val() + "']").show();
        });
    });
}

//******************************************************************************
