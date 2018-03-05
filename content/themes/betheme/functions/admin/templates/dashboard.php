<?php
if( ! defined( 'ABSPATH' ) ){
	exit; // Exit if accessed directly
}
?>

<div id="mfn-dashboard" class="wrap about-wrap">

	<?php include_once LIBS_DIR . '/admin/templates/parts/header.php'; ?>
	
	<div class="dashboard-tab register">
	
		<div class="col col-left">
			
			<?php if( mfn_is_registered() ): ?>
			
				<h3 class="primary"><?php esc_html_e( 'Theme is registered', 'mfn-opts' ); ?></h3>
			
				<form class="form-register form-deregister" method="post">
					
					<?php settings_fields( 'betheme_registration' ); ?>
					
					<p>
						<code><?php echo esc_html( mfn_get_purchase_code_hidden() ); ?></code>
					</p>

					<?php if( mfn_is_hosted() ): ?>
					
						<p class="confirm deregister" style="margin-bottom:40px">
							You are using Envato Hosted, this subscription code can not be deregistered.
						</p>
					
					<?php else: ?>
					
						<p class="confirm deregister">
							<a class="mfn-button mfn-button-primary mfn-button-fw"><?php esc_html_e( __( 'Deregister Theme', 'mfn-opts' ) ); ?></a>
						</p>
						
					<?php endif; ?>

					<?php if( WHITE_LABEL ): ?>
					
						<p class="question"><?php _e( 'This feature is disabled in White Label mode.', 'mfn-opts' );?></p>
						
					<?php else: ?>
					
						<p class="question">
							<span><?php esc_html_e( 'Are you sure you want to deregister the theme?', 'mfn-opts' ); ?></span>
							<a class="mfn-button cancel" target="_blank" href="#"><?php esc_html_e( 'Cancel', 'mfn-opts' ); ?></a>
							<input type="submit" class="mfn-button mfn-button-primary" name="deregister" value="<?php echo esc_attr( __( 'Deregister', 'mfn-opts' ) ); ?>" />
						</p>
						
					<?php endif; ?>
				
				</form>
				
				<?php if( ! WHITE_LABEL ): ?>
				
					<h3><?php esc_html_e( 'Buy license', 'mfn-opts' ); ?></h3>	
							
					<p><?php esc_html_e( 'If you need another license for new website', 'mfn-opts' ); ?></p>
					
					<?php 
						$purchase_link = 'https://themeforest.net/item/betheme-responsive-multipurpose-wordpress-theme/7758048?ref=muffingroup&license=regular&open_purchase_for_item_id=7758048';
						
						if( mfn_is_hosted() ){
							$purchase_link = 'https://themeforest.net/item/betheme-responsive-multipurpose-wordpress-theme/7758048?ref=muffingroup';
						}
					?>
					
					<a class="mfn-button mfn-button-secondary" target="_blank" href="<?php echo $purchase_link; ?>"><?php esc_html_e( 'Purchase new license', 'mfn-opts' ); ?></a>
				
				<?php endif; ?>
				
			<?php else: ?>
			
				<h3 class="primary">Theme Registration</h3>
			
				<?php if( is_super_admin() ): ?>
				
					<form class="form-register" method="post">
					
						<?php settings_fields( 'betheme_registration' ); ?>
						
						<p>
							<input type="text" placeholder="Paste your purchase code here" id="betheme_purchase_code" class="of-input" name="betheme_purchase_code" value="" size="36">
						</p>
						
						<p>
							<input type="submit" class="mfn-button mfn-button-primary mfn-button-fw" name="register" value="<?php echo esc_attr( __( 'Register Theme', 'mfn-opts' ) ); ?>" />
						</p>

					</form>
					
					<p><strong>Where can I find my purchase code?</strong></p>
						
					<ol>
						<li>Please go to <a target="_blank" href="https://themeforest.net/downloads">ThemeForest.net/downloads</a></li>
						<li>Click the <strong>Download</strong> button in BeTheme row</li>
						<li>Select <strong>License Certificate &amp; Purchase code</strong></li>
						<li>Copy <strong>Item Purchase Code</strong></li>
					</ol>	
						
					<h3>Buy license</h3>	
						
					<p>If you do not have license or need another one for new website</p>
					
					<a class="mfn-button mfn-button-secondary" target="_blank" href="https://themeforest.net/item/betheme-responsive-multipurpose-wordpress-theme/7758048?ref=muffingroup&license=regular&open_purchase_for_item_id=7758048">Purchase new license</a>
				
				<?php else: ?>
			
					<p>Plase login as administrator and register your theme.</p>
				
				<?php endif; ?>
			
			<?php endif; ?>	
			
			<?php if( ! mfn_is_hosted() ): ?>
			
				<p class="box">
					<strong>Important!</strong> One <a target="_blank" href="https://themeforest.net/licenses/standard">standard license</a> is valid only for <strong>1 website</strong>. Running multiple websites on a single license is a copyright violation.<br />
					When moving a site from one domain to another please deregister the theme first.
				</p>	
				
			<?php endif; ?>
			
		</div>
		
		<div class="col col-right">
		
			<?php if( ! mfn_is_hosted() ): ?>
			
				<h3><?php esc_html_e( 'System Status', 'mfn-opts' ); ?></h3>
				
				<?php include_once LIBS_DIR . '/admin/templates/parts/mini-status.php'; ?>
				
			<?php endif; ?>

			<h3>Useful links</h3>
			
			<ul class="links">
				
				<li><a href="admin.php?page=be-plugins"><?php esc_html_e( 'Install Plugins', 'mfn-opts' ); ?></a></li>
				<li><a href="admin.php?page=be-websites"><?php esc_html_e( 'Pre-built websites', 'mfn-opts' ); ?></a></li>		
				<li><a href="admin.php?page=be-options"><?php esc_html_e( 'Theme Options', 'mfn-opts' ); ?></a></li>
				
			</ul>

		</div>

	</div>
	
</div>
