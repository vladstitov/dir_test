<section id="SearchResult" data-str="uplight.SearchResult">
    <div class="col-sm-12">
        <? include('htms/kiosk/ListHeader.php'); ?>
    </div>
    <hr style="margin-bottom: 0"/>
    <div  class="col-lg-12">
        <? include('htms/kiosk/ListMain.php'); ?>
    </div>
    <hr style="margin-top: 0"/>
    <div  class="col-sm-12">
        <div class="more col-sm-8" >
            <p style="vertical-align: text-bottom; line-height: 140px">  <?=  isset($labels['list_footer'])?$labels['list_footer']:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?></p>
        </div>
        <div class="col-sm-4">
            <? include('htms/kiosk/SearchInput.php'); ?>
        </div>
    </div>
</section>