<?php 
  // Create Global Objects
  $objSftp = new com("AxNetwork.Sftp"); 
?>

<?php
  // A license key is required to unlock this component after the trial period has expired.
  // Call 'Activate' with a valid license key as its first parameter. Second parameter determines whether to save the license key permanently 
  // to the registry (True, so you need to call Activate only once), or not to store the key permanently (False, so you need to call Activate
  // every time the component is created). For details, see manual, chapter "Product Activation".
  
  // $objSftp.Activate "XXXXX-XXXXX-XXXXX", False   
?>

<?php
  //Create Global Variables
  $strLogFile = ""; $strHost = ""; $strUser = ""; $strPassword =""; $strRemoteFile = ""; $strLocalFile = "";
  $nPort = 0;
  
  $strResult = "";
?>

<?php
  // Handle POST
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $strLogFile = $_POST['txtLogFile'];
      $strHost = $_POST['txtHost'];
      $strUser = $_POST['txtUser'];
      $strPassword = $_POST['txtPassword'];
      $strRemoteFile = $_POST['txtRemoteFile'];
      $strLocalFile = $_POST['txtLocalFile'];
      $nPort = $_POST['txtPort'];
      
      $objSftp->LogFile = $strLogFile;    
      
      $objSftp->Host = $strHost;
      $objSftp->Port = $nPort;          
      $objSftp->Username = $strUser;
      $objSftp->Password = $strPassword;
      $objSftp->AcceptHostkey = True;
      
      $objSftp->Connect();
      if ($objSftp->LastError == 0) {      
        if (isset($_POST['btnPUT']))
        {
          $objSftp->PutFile($strLocalFile, $strRemoteFile);
        }
        
        if (isset($_POST['btnGET']))
        {          
          $objSftp->GetFile($strRemoteFile, $strLocalFile);
        }
      }
      
      $strResult = "{$objSftp->LastError} : {$objSftp->GetErrorDescription($objSftp->LastError)}";
      $objSftp->Disconnect();  }
?>

<?php 
  // Include Header and Menu
  include 'css/header.html'; 
  include 'css/menu.html'; 
?>

<div class="container">
  <h1>ActiveXperts Network Component PHP Sample - SFTP</h1>

  <form action="sftp.php" method="post">
    <h2>Component:</h2>
    <h3>Module [<?php echo $objSftp->Module ?>]; Build [<?php echo $objSftp->Build ?>]</h3>

    <!-- Remote Host: -->
    <label for="remotehost">Remote Host:</label>
    <p>
      <input type="text" name="txtHost" value="<?php if ($strHost == "") {echo "srv202.activexperts-labs.com"; } else { echo $strHost; } ?>">
      Port: 
      <input style="width: 50px" type="text" name="txtPort" value="<?php if ($nPort == "") {echo 22; } else { echo $nPort; } ?>">
    </p>
    
    <!-- User -->
    <label for="user">User:</label>
    <p>
      <input type="text" name="txtUser" value="<?php if ($strUser == "") {echo "activexperts"; } else { echo $strUser; } ?>">
    </p>
    
    <!-- Password -->
    <label for="Password">Password:</label>
    <p>
      <input type="password" name="txtPassword" value="<?php if ($strPassword == "") {echo "topsecret"; } else { echo $strPassword; } ?>">
    </p>
    
    <!-- Remote File(Linux) -->
    <label for="remotefile">Remote File(Linux):</label>
    <p>
      <input type="text" name="txtRemoteFile" value="<?php if ($strRemoteFile == "") {echo "/network-component/readme.txt"; } else { echo $strRemoteFile; } ?>">
    </p>
    
    <!-- Local File(Windows) -->
    <label for="localfile">Local File(Windows):</label>
    <p>
      <input type="text" name="txtLocalFile" value="<?php if ($strLocalFile == "") {echo ini_get('upload_tmp_dir').'/readme.txt'; } else { echo $strLocalFile; } ?>">
    </p>
    
    <!-- Copy File Button -->
    <div class="clearLabel"></div>
    <p>
      <input type="submit" value="Copy Remote File to Local File" name="btnGET">
      <input type="submit" value="Copy Local File to Remote File" name="btnPUT">
    </p>
    
    <!-- Empty Row -->
    <div class="clearRow"></div>
    
    <!-- Logfile -->
    <label for="Logfile">Logfile:</label>
    <p>
        <input type="text" id="LogFile" name="txtLogFile" class="FullWidth" value="<?php if ($strLogFile == "") { echo ini_get('upload_tmp_dir')."/SFTP.log"; } else {echo $strLogFile;} ?>" />
    </p> 
    
    <!-- Result -->
    <label for="Result">Result:</label>
    <p>
      <input type="text" id="Result" name="txtResult" class="FullWidth" style="font-weight: bold;" value="<?php echo $strResult; ?>" />
    </p>
  </form>
  <p>
    This sample is based on ActiveXperts Network Component, an <a href="http://www.activexperts.com/" target="_blank">ActiveXperts Software</a> product.<br />
    <a href="Default.php">Back to main page</a>
  </p>
</div><!-- /container -->

<?php 
  // Include Footer
  include 'css/footer.html'; 
?>