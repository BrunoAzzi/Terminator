
var chapikey = chaordic.Config.API_KEY;
var imageConfig = [];

/* ########### START EDITING HERE ########### */

imageConfig.push({ name: '450x540', width: '450', height: '540', url: 'http://cea.vteximg.com.br/arquivos/ids/500415-450-540/Vestido-de-Renda--Preto-8008108-Preto_1.jpg' });

if(imageConfig && imageConfig.length){
    imageConfig.images= {};
    for(var i=0; i < imageConfig.length; i++){
        var imageUrl = imageConfig[i];
    }
}

var rec = ref = product;

/*{
    id: "2048990",
    name: "Vestido de renda preto",
    url: "www.google.com.br/",
    description: "Vestido confeccionado em renda, um tecido de caimento leve que tem toque seco. A renda aplicada proporciona leve transparência. O modelo tem decote arredondado com abertura frontal por colchetes. Tem mangas longas com abertura estilo boca de sino e o fechamento é lateral por zíper. O forro proporciona maior liberdade de movimento e conforto.",
    installment: { count: 2, price: 14.99 },
    oldPrice: 149.99,
    price: 114.99,
    status: "available",
    images: imageConfig.images,
	specs: {
        color: [{ id: "Azul", label: "Azul" }, { id: "Vermelho", label: "Vermelho" }],
        size: [{ id: "34", label: "34" }, { id: "36", label: "36" }, { id: "38", label: "38" }, { id: "40", label: "40" }, { id: "42", label: "42" }, { id: "44", label: "44" }]
    },
    skus: [
      { sku: "XL3CLQ33EX", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Vermelho", size: "38" }, stock: 22, status: "available", "images": {}},
      { sku: "XL3CLQ11EX", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Azul", size: "38" }, stock: 21, status: "available", "images": {} },
      { sku: "JZ2H02S043", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Azul", size: "36" }, stock: 7, oldPrice: "", price: 13.3, status: "available", "images": {} },
      { sku: "O1ZSS3ZM6C", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Vermelho", size: "40" }, stock: 1, status: "available", "images": {} },
      { sku: "33H1CX8BU2", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Azul", size: "44" }, stock: 0, status: "unavailable", "images": {} },
      { sku: "3AB8B52LB2", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Azul", size: "34" }, stock: 0, status: "unavailable", "images": {} },
      { sku: "B0FE45A7A3", extraInfo: { flagTeste: false, flagFalse: false }, specs: { color: "Azul", size: "42" }, stock: -2, status: "unavailable", "images": {} }
    ],
    daysOnTop: "0",
    tendency: "NONE",
    trigger: "ranking",
    age: null,
    percentage: null,
    categories: [{ name: "Moda Feminina", id: "1" }, { name: "Shorts", id: "60", parents: ["1"] }, { name: "Sarja", id: "10176", parents: ["60"] }],
    extraInfo: { flagTeste: true, flagFalse: true }
};*/

if(imageConfig&&imageConfig.length){rec.images={};for(var i=0;i<imageConfig.length;i++){var imageUrl=imageConfig[i].url?imageConfig[i].url:"https://placehold.it/"+imageConfig[i].width+"x"+imageConfig[i].height;if(rec.images[imageConfig[i].name]=imageUrl+"?text="+imageConfig.id,rec.skus&&rec.skus.length)for(var j=0;j<rec.skus.length;j++)rec.skus[j].images[imageConfig[i].name]=imageUrl+"?text="+rec.skus[j].sku}}var whichDivs=[],recPP=JSON.parse(JSON.stringify(rec));recPP.trigger="transaction",recPP.date="10/10/2014";var config={apikey:chapikey,divs:[{name:"mostpopular"},{name:"offers"},{name:"new4you"},{name:"featured"},{name:"viewpersonalized"},{name:"purchasepersonalized"},{name:"shoppingcart"},{name:"frequentlyboughttogether"},{name:"similaritems"},{name:"ultimatebuy"},{name:"historypersonalized"},{name:"push"}],templates:{response:rec,css:""},useRealRecs:!1,referenceProduct:""},buildFakeResponse=function(e,a){function r(){return Math.random()<.5}for(var i,s=a.templates.response,t=function(){var e=s.images,a=e[Object.keys(e)[0]];return/^\/\//.test(a)?"%IMAGE_NAME%":window.location.href.replace(/https?:/,"")+"%IMAGE_NAME%"},n={ok:!0,feature:e,displays:[{refs:[],recs:[]}],client:{urlTemplates:{image:{http:t(),https:t()},product:"%DETAIL_URL%",cart:""}}},d=0;d<a.size;d++)i=$.extend({},s),i.apiKey=a.apikey,r()?(i.price=parseInt(i.price)+2*parseInt(i.price),i.oldPrice&&(i.oldPrice=parseInt(i.oldPrice)+parseInt(i.price))):i.oldPrice&&(i.oldPrice=0),d%2==0&&(i.name=i.name+" "+i.name),n.displays[0].recs.push(i);var o=$.extend({},s);return o.apiKey=a.apiKey,n.displays[0].refs.push(o),n},original=chaordic.ThemeManager.addTheme;chaordic.ThemeManager.addTheme=function(e,a,r){r.data||(config.size=r.size||10,r.data=buildFakeResponse(e.toLowerCase(),config));var i=config.templates.response,s={id:i.id};if("PurchasePersonalized"===e&&r.data&&r.data.displays[0]&&r.data.displays[0].refs[0]&&(r.data.displays[0].refs[0].trigger="transaction",r.data.displays[0].refs[0].date="10/10/2014",r.data.feature="purchasepersonalized"),"New4You"===e&&(r.data.displays[0].recs=r.data.displays[0].recs.map(function(e){return e.age=4837648500,e})),"HistoryPersonalized"===e&&r.data&&r.data.displays[0]&&r.data.displays[0].refs[0]){var t=r.data.displays[0].refs[0];r.data.displays[0].refs[1]=t,r.data.displays[0].refs[2]=t,r.data.displays[0].refs[3]=t,r.data.displays[0].refs[4]=t,r.data.displays[0].refs[5]=t,r.data.displays[0].refs[6]=t}"UltimateBuy"===e&&(!window.chaordic_meta||window.chaordic_meta.product&&window.chaordic_meta.product.id||(window.chaordic_meta.product=s),r.data.displays[0].recs=r.data.displays[0].recs.map(function(e,a){var i=r.data.displays[0].recs[a-1]&&r.data.displays[0].recs[a-1].percentage?r.data.displays[0].recs[a-1].percentage:30,s=99>i+20?i+20:99;return e.percentage=Math.floor(Math.random()*(s-i+1))+i,a>0&&(e.id=e.id+"1"),e})),"ShoppingCart"===e?r.referenceProducts||(r.referenceProducts=[s]):$.inArray(e,["FrequentlyBoughtTogether","SimilarItems","UltimateBuy","ViewPersonalized"])&&(r.referenceProduct||(r.referenceProduct=s)),original.apply(this,arguments)};
