<div class="stream col-xs-12 col-md-6">
	<div class="broadcast-meta">
		<a href="https://www.twitch.tv/{channel.stream.channel.name}/profile">
			<div class="profile-photo">
				<img src="{channel.stream.channel.logo}" alt="{channel.stream.channel.display_name}" />
			</div>
		</a>

		<div class="info">
			<div class="title">
				<span class="real" alt="{channel.stream.channel.status}">{channel.stream.channel.status}</span>
			</div>
			<div class="channel">
				<a href="https://www.twitch.tv/{channel.stream.channel.name}/profile">{channel.stream.channel.display_name}</a> playing
				<a href="https://www.twitch.tv/directory/game/{channel.stream.channel.game}">{channel.stream.channel.game}</a>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="stream-container col-xs-12 col-md-12">
			<img data-twitch-name="{channel.stream.channel.name}" src="{channel.stream.preview.large}" class="stream-placeholder stream-img" alt="" />
		</div>
	</div>
</div>
