// 获取当前选项卡ID
function getCurrentTabId(callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		if(callback) callback(tabs.length ? tabs[0].id: null);
	});
}

// 这2个获取当前选项卡id的方法大部分时候效果都一致，只有少部分时候会不一样
function getCurrentTabId2()
{
	chrome.windows.getCurrent(function(currentWindow)
	{
		chrome.tabs.query({active: true, windowId: currentWindow.id}, function(tabs)
		{
			if(callback) callback(tabs.length ? tabs[0].id: null);
		});
	});
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.sendMessage(tabId, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

// 向content-script注入JS片段
function executeScriptToCurrentTab(code)
{
	getCurrentTabId((tabId) =>
	{
		chrome.tabs.executeScript(tabId, {code: code});
	});
}


// 修改背景色
$('#readMode').click(() => {
	executeScriptToCurrentTab('var sidebar=document.getElementsByClassName("sidebar")[0];');
	executeScriptToCurrentTab('sidebar.style.cssText="display: none";');
	executeScriptToCurrentTab('var articleBanner=document.getElementsByClassName("article-banner")[0];');
	executeScriptToCurrentTab('articleBanner.style.cssText="display: none";');
	executeScriptToCurrentTab('var container0=document.getElementsByClassName("container")[0];');
	executeScriptToCurrentTab('container0.style.cssText="max-width: 1280px";');
	executeScriptToCurrentTab('var container1=document.getElementsByClassName("container")[1];');
	executeScriptToCurrentTab('container1.style.cssText="max-width: 1280px";');
	executeScriptToCurrentTab('var mainArea=document.getElementsByClassName("main-area")[0];');
	executeScriptToCurrentTab('mainArea.style.cssText="width: 1280px";');
	executeScriptToCurrentTab('var mainArea1=document.getElementsByClassName("main-area")[1];');
	executeScriptToCurrentTab('mainArea1.style.cssText="width: 1280px";');
	
	executeScriptToCurrentTab('var recommendedArea=document.getElementsByClassName("recommended-area")[0];');
	executeScriptToCurrentTab('recommendedArea.style.cssText="display: none";');
});