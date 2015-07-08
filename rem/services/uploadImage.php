<?php
 $file = $_FILES['file'];
 $image = $file['tmp_name'];
  $max_upload_size = ini_max_upload_size();
 @$size = getimagesize($image);
 $id='';
 if(isset($_GET['id']))$id=$_GET['id'];
  $url= "data/pages/img/" .$id.$file["name"];
 $out=json_encode($file);
 if(move_uploaded_file($image,'../../'.$url)); $out=$url;
 
 echo $out;
 
 function ini_max_upload_size() {
    $post_size = ini_get('post_max_size');
    $upload_size = ini_get('upload_max_filesize');
    if(!$post_size) $post_size = '8M';
    if(!$upload_size) $upload_size = '2M';
    
    return min( ini_bytes_from_string($post_size), ini_bytes_from_string($upload_size) );
}
function ini_bytes_from_string($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    switch($last) {      
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }
    return $val;
}

?>