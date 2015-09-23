function listEvents(root) {
  var feed = root.feed;
  var entries = feed.entry || [];
  var html = ['<ul>'];

  for (var i = 0; i < entries.length; ++i) {
    var entry = entries[i];
    var id = entry.term;

    html.push('<li>', entry.gsx$id.$t, '</li>');
    html.push('<li>', entry.gsx$sku.$t, '</li>');
    html.push('<li>', entry.gsx$categories.$t, '</li>');
    html.push('<li>', entry.gsx$status.$t, '</li>');
  }

  html.push('</ul>');
  document.getElementById("agenda").innerHTML = html.join("");
}
