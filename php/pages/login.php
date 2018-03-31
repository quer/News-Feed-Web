<?php
include_once 'includes/db_connect.php';
include_once 'includes/functions.php';
if (login_check($mysqli) == true) {
	?>
	
	<?php
}else{
	?>
	<form name="login_form">
		<div class="form-group row">
			<label for="inputPassword" class="col-sm-2 col-form-label">Email</label>
			<div class="col-sm-10">
				<input type="text" class="form-control" id="inputEmail" placeholder="Email">
			</div>
		</div>
		<div class="form-group row">
			<label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
			<div class="col-sm-10">
				<input type="Password" class="form-control" id="inputPassword" placeholder="Password">
			</div>
		</div>
        <button type="submit" class="btn btn-primary">Sign in</button>
    </form>
	<?php
}