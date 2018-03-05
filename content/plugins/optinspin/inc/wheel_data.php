<?php
include '../../../../app/wp-load.php';
$optinspin_wheel = new optinspin_Wheel();

$sess=$_SESSION['wheeldata'];

header('Content-type: application/json');
// optinspin_get_segment_colors
// array("#364C62", "#F1C40F", "#E67E22", "#2ECC71", "#E87AC2", "#3498DB", "#9B59B6", "#7F8C8D")
// $optinspin_wheel->optinspin_get_segment_colors()
$data = array(
    "colorArray" => $sess['optinspin_get_segment_colors'],

    "segmentValuesArray" => $sess['optinspin_get_segments'],
    "svgWidth" => 1024,
    "svgHeight" => 768,
    "wheelStrokeColor" => $sess['optinspin_border_color'],
    "wheelStrokeWidth" => $sess['optinspin_border_width'],
    "wheelSize" => 800,
    "wheelTextOffsetY" => 110,
    "wheelTextColor" => $sess['optinspin_text_color'],
    "wheelTextSize" => $sess['optinspin_text_size'],
    "wheelImageOffsetY" => 40,
    "wheelImageSize" => 50,
    "centerCircleSize" => 100,
    "centerCircleStrokeColor" =>  $sess['optinspin_inner_border_color'],
    "centerCircleStrokeWidth" => 12,
    "centerCircleFillColor" => "#EDEDED",
    //"segmentStrokeColor" => "#E2E2E2",
    "segmentStrokeColor" => "#000",
    "segmentStrokeWidth" => 2,
    "centerX" => 512,
    "centerY" => 384,
    "hasShadows" => false,
    "numSpins" => 2,
    "spinDestinationArray" => array(),
    "minSpinDuration" => $sess['optinspin_spin_speed'],
    "gameOverText" => "THANK YOU FOR PLAYING SPIN2WIN WHEEL. COME AND PLAY AGAIN SOON!",
    "invalidSpinText" =>"INVALID SPIN. PLEASE SPIN AGAIN.",
    "introText" => "YOU HAVE TO<br>SPIN IT <span style='color=>#F282A9;'>2</span> WIN IT!",
    "hasSound" => $sess['hasSound'],
    "gameId" => "9a0232ec06bc431114e2a7f3aea03bbe2164f1aa",
    "clickToSpin" => true

);

echo json_encode($data);
?>