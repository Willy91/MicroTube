var app = angular.module('MicroTube',['ngResource']);
var idVid;

function MicroTubeCtrl($scope,$resource) {
	$scope.microtube = $resource('https://www.googleapis.com/youtube/v3/search',{
		key:'AIzaSyDyeN-RttUjdoYobMiXu5UpElsYZhrrFCA',

		type:'video',
		q:'',
		part:'snippet'
	});

	$scope.doSearch = function() {
		if($scope.search)
		$scope.results = $scope.microtube.get({q:$scope.search});
	}

	$scope.updateVideo = function(id) {
		if(!player) {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
			idVid = id;
		}

		player.loadVideoById(id);
	}

	$scope.changePage = function(pageToken) {
		$scope.results = $scope.microtube.get({
			q:$scope.search,
			pageToken:pageToken
		});
	}
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  	player = new YT.Player('player', {
			    height: '390',
			    width: '640',
			    videoId: idVid,
			    events: {
			      'onReady': onPlayerReady
			    }
  	});

}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}