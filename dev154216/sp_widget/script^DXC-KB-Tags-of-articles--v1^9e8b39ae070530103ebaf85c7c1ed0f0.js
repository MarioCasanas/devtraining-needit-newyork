(function() {

    //Get Knowledge Base Id. If knowledge base is not selected, get knowledge bases associated with portal.
    data.kb = "";
    data.kb_id = $sp.getParameter("kb_id");
    data.show = false;
	
	//MC
    //gs.addInfoMessage("SERVER SCRIPT - (antes del IF) -> data.kb_id -> " + data.kb_id);
	
    if (data.kb_id) {
        var kbArr = [];
        var kbGR = new GlideRecord("kb_knowledge_base");
        kbGR.addQuery("sys_id", "IN", data.kb_id);
        kbGR.query();

        //MC
        //gs.addInfoMessage("SERVER SCRIPT - (DENTRO del IF) sys_id (data.kb_id) -> " + data.kb_id);

        while (kbGR.next()) {
            if (kbGR.canRead())
                kbArr.push(kbGR.getUniqueValue());
        }
        data.kb = String(kbArr);
    } else
        data.kb = String($sp.getKnowledgeBases());
	
	//MC
    //gs.addInfoMessage("SERVER SCRIPT - (Luego del IF) -> data.kb -> " + data.kb);

    //To support Show more functionality
    var loadCategories = options.number_of_categories_to_load || 15;
    data.showMoreMsg = gs.getMessage("Show More");
    data.pleaseWait = gs.getMessage("Please wait... fetching categories");

    var maxArticleLimitForCounts = parseInt(options.max_article_limit_for_counts) || 500;
    var articles = new GlideRecord("kb_knowledge");
    articles.addQuery("kb_knowledge_base", "IN", data.kb);
    articles.addQuery("workflow_state", "published");
    articles.addQuery("valid_to", ">=", new GlideDate().getValue());
    articles.addActiveQuery();
    articles.setLimit(maxArticleLimitForCounts);
    articles.query();

    var kbCount = articles.getRowCount();

    // Get all top-level categories in selected knowledge bases
    var cats = new GlideRecord("kb_category");
    cats.addActiveQuery();
    cats.addQuery("parent_id", 'IN', data.kb);
    cats.orderBy('label');
    cats.query();

    var categoryId = $sp.getParameter('kb_category');
    var msg = data.messages = {};
    msg.expanded = gs.getMessage("Expanded");
    msg.collapsed = gs.getMessage("Collapsed");

    data.category = {};
    data.categories = [];

    //To support Show more functionality
    if (input && input.getMore)
        loadCategories = loadCategories + parseInt(input.categoriesCount);

    var categoriesCount = 0;

    // Get Subcategories and build tree structure
    while (cats.next()) {
        var categoryDetails = getCategory(cats, 0);
        data.categories.push(categoryDetails);

        //To support Show more functionality
        if (categoryDetails.count != 0)
            categoriesCount++;
        if (categoriesCount >= loadCategories)
            break;
    }

    data.showMore = cats.hasNext();
    data.categoriesCount = categoriesCount;
    data.loadAllMsg = gs.getMessage("Showing {0} categories", [categoriesCount + ""]);
    data.categoryId = categoryId;

    options.check_access_per_category = parseInt(options.check_access_per_category);

    function getCategory(cats, level) {
        var categoryDetails = {};
        var articleCount = -1;
        var arts;

        if (kbCount < maxArticleLimitForCounts) {
            // small KB, get full canRead counts for each category
            arts = $sp.getKBCategoryArticleSummary(cats.getUniqueValue(), 0, 0);
            articleCount = arts.length;
            if (articleCount > 0)
                data.show = true;
        } else if (options.check_access_per_category > 0) {
            // large KB, don't get counts but check first N articles for read access to category
            arts = $sp.getKBCategoryArticleSummary(cats.getUniqueValue(), options.check_access_per_category, 0);
            if (arts.length > 0)
                data.show = true;
            else
                articleCount = 0; // nothing to see here, no visible article found
        } else {
            // large KB, not checking article access before showing category, preserves legacy behavior
            data.show = true;
        }

        categoryDetails.label = cats.getDisplayValue("label");
        categoryDetails.value = cats.getUniqueValue();
        categoryDetails.count = articleCount;
        categoryDetails.showChildren = (cats.sys_id == categoryId);
        categoryDetails.level = level;

        var subcategories = new GlideRecord("kb_category");
        subcategories = $sp.getSubCategories(cats.getUniqueValue());
        categoryDetails.subcategories = [];
        while (subcategories.next()) {
            var category = getCategory(subcategories, level + 1);
            if (category.count != 0) {
                categoryDetails.subcategories.push(category);
                categoryDetails.count += category.count;
            }
            categoryDetails.showChildren = categoryDetails.showChildren || category.showChildren;
        }
        return categoryDetails;
    }

    /**
     * 
     * ORIGINAL **    
    //Get Knowledge Base Id. If knowledge base is not selected, get knowledge bases associated with portal.
    data.kb = "";
    data.kb_id = $sp.getParameter("kb_id");
    data.show = false;
	
    if (data.kb_id) {
        var kbArr = [];
        var kbGR = new GlideRecord("kb_knowledge_base");
        kbGR.addQuery("sys_id", "IN", data.kb_id);
        kbGR.query();

        while (kbGR.next()) {
            if (kbGR.canRead())
                kbArr.push(kbGR.getUniqueValue());
        }
        data.kb = String(kbArr);
    } else
        data.kb = String($sp.getKnowledgeBases());
	
    //To support Show more functionality
    var loadCategories = options.number_of_categories_to_load || 15;
    data.showMoreMsg = gs.getMessage("Show More");
    data.pleaseWait = gs.getMessage("Please wait... fetching categories");

    var maxArticleLimitForCounts = parseInt(options.max_article_limit_for_counts) || 500;
    var articles = new GlideRecord("kb_knowledge");
    articles.addQuery("kb_knowledge_base", "IN", data.kb);
    articles.addQuery("workflow_state", "published");
    articles.addQuery("valid_to", ">=", new GlideDate().getValue());
    articles.addActiveQuery();
    articles.setLimit(maxArticleLimitForCounts);
    articles.query();

    var kbCount = articles.getRowCount();

    // Get all top-level categories in selected knowledge bases
    var cats = new GlideRecord("kb_category");
    cats.addActiveQuery();
    cats.addQuery("parent_id", 'IN', data.kb);
    cats.orderBy('label');
    cats.query();

    var categoryId = $sp.getParameter('kb_category');
    var msg = data.messages = {};
    msg.expanded = gs.getMessage("Expanded");
    msg.collapsed = gs.getMessage("Collapsed");

    data.category = {};
    data.categories = [];

    //To support Show more functionality
    if (input && input.getMore)
        loadCategories = loadCategories + parseInt(input.categoriesCount);

    var categoriesCount = 0;

    // Get Subcategories and build tree structure
    while (cats.next()) {
        var categoryDetails = getCategory(cats, 0);
        data.categories.push(categoryDetails);

        //To support Show more functionality
        if (categoryDetails.count != 0)
            categoriesCount++;
        if (categoriesCount >= loadCategories)
            break;
    }

    data.showMore = cats.hasNext();
    data.categoriesCount = categoriesCount;
    data.loadAllMsg = gs.getMessage("Showing {0} categories", [categoriesCount + ""]);
    data.categoryId = categoryId;

    options.check_access_per_category = parseInt(options.check_access_per_category);

    function getCategory(cats, level) {
        var categoryDetails = {};
        var articleCount = -1;
        var arts;

        if (kbCount < maxArticleLimitForCounts) {
            // small KB, get full canRead counts for each category
            arts = $sp.getKBCategoryArticleSummary(cats.getUniqueValue(), 0, 0);
            articleCount = arts.length;
            if (articleCount > 0)
                data.show = true;
        } else if (options.check_access_per_category > 0) {
            // large KB, don't get counts but check first N articles for read access to category
            arts = $sp.getKBCategoryArticleSummary(cats.getUniqueValue(), options.check_access_per_category, 0);
            if (arts.length > 0)
                data.show = true;
            else
                articleCount = 0; // nothing to see here, no visible article found
        } else {
            // large KB, not checking article access before showing category, preserves legacy behavior
            data.show = true;
        }

        categoryDetails.label = cats.getDisplayValue("label");
        categoryDetails.value = cats.getUniqueValue();
        categoryDetails.count = articleCount;
        categoryDetails.showChildren = (cats.sys_id == categoryId);
        categoryDetails.level = level;

        var subcategories = new GlideRecord("kb_category");
        subcategories = $sp.getSubCategories(cats.getUniqueValue());
        categoryDetails.subcategories = [];
        while (subcategories.next()) {
            var category = getCategory(subcategories, level + 1);
            if (category.count != 0) {
                categoryDetails.subcategories.push(category);
                categoryDetails.count += category.count;
            }
            categoryDetails.showChildren = categoryDetails.showChildren || category.showChildren;
        }
        return categoryDetails;
    }     
     */
})();