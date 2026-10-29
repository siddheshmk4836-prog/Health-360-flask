const C={blue:'#5d80ef',teal:'#2bb5a4',violet:'#9a83e5',orange:'#e8a35d'};
const layout={paper_bgcolor:'rgba(0,0,0,0)',plot_bgcolor:'rgba(0,0,0,0)',font:{family:'DM Sans,sans-serif',size:10,color:'#718391'},margin:{l:38,r:12,t:15,b:38},xaxis:{gridcolor:'#eef2f5',zerolinecolor:'#eef2f5'},yaxis:{gridcolor:'#eef2f5',zerolinecolor:'#eef2f5'},showlegend:false};
const cfg={displayModeBar:false,responsive:true};
async function draw(){
 const params=new URLSearchParams({condition:document.querySelector('#condition').value,region:document.querySelector('#region').value,risk_level:document.querySelector('#risk_level').value});
 const rows=await (await fetch('/api/health-data?'+params)).json(), total=rows.reduce((s,r)=>s+(+r.cases||0),0);
 const conditions={}; rows.forEach(r=>conditions[r.condition]=(conditions[r.condition]||0)+(+r.cases||0));
 const names=Object.keys(conditions), high=rows.filter(r=>r.risk_level==='High').reduce((s,r)=>s+(+r.cases||0),0), lead=Object.entries(conditions).sort((a,b)=>b[1]-a[1])[0];
 document.querySelector('#total').textContent=total.toLocaleString();document.querySelector('#count').textContent=names.length;document.querySelector('#high').textContent=high.toLocaleString();document.querySelector('#leading').textContent=lead?lead[0]:'—';
 Plotly.react('conditionChart',[{type:'bar',x:names,y:names.map(n=>conditions[n]),marker:{color:[C.blue,C.teal,C.violet,C.orange]},hovertemplate:'%{x}: %{y}<extra></extra>'}],{...layout,margin:{l:35,r:10,t:15,b:45},xaxis:{...layout.xaxis,tickangle:-12},yaxis:{...layout.yaxis,rangemode:'tozero'},bargap:.4},cfg);
 const levels=['Low','Medium','High'], vals=levels.map(l=>rows.filter(r=>r.risk_level===l).reduce((s,r)=>s+(+r.cases||0),0));
 Plotly.react('riskChart',[{type:'pie',labels:levels,values:vals,hole:.67,sort:false,marker:{colors:[C.teal,C.blue,C.orange]},textinfo:'percent',hovertemplate:'%{label}: %{value}<extra></extra>'}],{paper_bgcolor:'rgba(0,0,0,0)',font:{family:'DM Sans',size:10,color:'#718391'},margin:{l:0,r:0,t:5,b:5},showlegend:true,legend:{orientation:'h',x:.5,xanchor:'center',y:-.05,font:{size:10}},annotations:[{text:total.toLocaleString(),showarrow:false,font:{size:18,color:'#172a3a'}}]},cfg);
 const ages=['18–29','30–44','45–59','60+'], agevals=ages.map(a=>rows.filter(r=>r.age_group===a).reduce((s,r)=>s+(+r.cases||0),0));
 Plotly.react('ageChart',[{type:'scatter',mode:'lines+markers',x:ages,y:agevals,line:{color:C.teal,width:3,shape:'spline'},marker:{size:7},fill:'tozeroy',fillcolor:'rgba(43,181,164,.1)'}],{...layout,yaxis:{...layout.yaxis,rangemode:'tozero'}},cfg);
 const z=names.map(n=>levels.map(l=>rows.filter(r=>r.condition===n&&r.risk_level===l).reduce((s,r)=>s+(+r.cases||0),0)));
 Plotly.react('matrixChart',[{type:'heatmap',x:levels,y:names,z,colorscale:[[0,'#edf7f6'],[.5,'#80d4c7'],[1,'#237d83']],hovertemplate:'%{y}<br>%{x}: %{z}<extra></extra>',colorbar:{thickness:9,tickfont:{size:9}}}],{...layout,margin:{l:105,r:20,t:8,b:35},yaxis:{...layout.yaxis,autorange:'reversed'}},cfg);
}
['condition','region','risk_level'].forEach(id=>document.getElementById(id).addEventListener('change',draw));
document.getElementById('reset').addEventListener('click',()=>{['condition','region','risk_level'].forEach(id=>document.getElementById(id).value='All');draw()});draw();
