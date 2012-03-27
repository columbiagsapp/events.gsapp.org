
GLOBAL FILTER CONFIGURATION (6.x)
=================================
A global filter can be either a node property/field or a view.

The 6.x version fully supports Views but as far as fields go, only the common
node properties (e.g. type etc.), not CCK fields, yet.

When using a view be aware that it will be the first item under the Fields
heading that will populate the filter drop-down, so re-order your items if
necessary. The remaining items will be ignored. The view does not need to have a
page or block display associated with it and may even be disabled -- it will
still operate correctly as a global filter.

0) You normally use this module in the context of Views, so enable that module
together with Global Filter.

1) A couple of filter blocks, named "Global filter 1" and "Global filter 2" will
now be available at Structure >> Blocks. Click "configure" to select the field
you want to employ to populate the global drop-down. Note that the drop-down
will be a text box, if the field does not represent a list, radio buttons,
check box or vocabulary, i.e. a number or text. Place the block or blocks
anywhere on your site.
If you want to use more than two global filters, you can create more filter
blocks at Configuration >> Global Filter.

2) You can use either a node property or the output of a view as a global
filter. Use the radio buttons on the block configuration page to select which
one. If none of the node properties match what you're after (eg a taxonomy term)
use a view. When using a view make sure that the first field of the view you
create is the one whose values should appear in the filter drop-down, e.g. user
name, content type etc.
In D6 also include the base field, i.e. nid for nodes, uid for users etc.,
unless your view type is "Term", in which case you don't have to output any
fields at all (but it won't hurt if you do).

3) With the global drop-down in place, you can now use it as the default
argument value in any number of views that you want to pass the filter to. On
the View edit page, under Arguments, add and tick the option corresponding to
the global filter source in the previous step. If you created a Term view in
step 2, then select the "Taxonomy: Term ID" argument, not "Taxonomy: Term" (i.e
not the term name).
After pressing "Add", on the next panel, select the radio button "Provide
default value".

3a) When in step 2 you chose a node property as the source for the global
filter, select the Argument type radio button "Global filter (field)".
3b) When you chose a View as the source for the global filter, select radio
button "Global filter (view)" and then select the View driving this filter.

4) Update. Ignore the warning: "Cannot modify header information - headers
already sent...". Press Save.

That's all. Repeat steps 3) and 4) for the remaining Views that need to use the
global filter.

The initial filter selection will be 'all'.

By default each drop-down filter comes with a Set button to activate the
selection. However if you tick the appropriate checkbox on the Configuration >>
Global Filter page, the Set button does not appear and the filter is activated
immediately upon release of the mouse.


USEFUL VIEW OPTIONS
===================
On the View edit page, in the Arguments configuration panel, after you have
selected Global filter block to provide the default value, scroll down the panel
for a couple of additional useful options.
"Allow multiple values" is handy when your global filter is a vocabulary. If
this box is ticked, then when the global filter vocabulary has a parent-child
hierarchy, selecting a parent (e.g Europe) will also automatically match any of
its children (eg France, Germany, etc.).
"Exclude is nice to populate a view with the compliment of the global filter
selection (e.g. all countries except European countries).


ADVANCED OPTIONS: ROTATING BLOCK CONTENT
========================================
A special auto-cycle filter is available under the "Advanced configuration"
fieldset on the Configuration >> Global Filter page. You can use this to create
rotating block content, such as ads, news flashes or user profile pictures, that
have to follow a specific logical sequence, for instance chronological (e.g. by
creation or modification date), alphabetical or by vocabulary term order.

You need two views, let's call these the filter view and the block view.

The filter view simply needs to return, in the desired order, the nodes (or
users or...) that you wish to rotate through the block. This view does not need
page or block displays and does not have to output any fields other than the
base field, i.e the nid (or uid or...). However, to verify the view correctly
returns the output in the order you wish them to cycle through the block, we
suggest to configure the style settings to output titles, at least while
testing. Save.
We will now activate the view as the driver for the auto-cycle filter at Site
Configuration >> Global Filter, opening the "Advanced configuration" fieldset.
Select the view you've just created and press "on every page load".

The block view needs to produce at least as much content as the filter view. In
fact you could start by cloning the filter view and use it as a base. Select any
display format and any fields you like to display for the block of rotating
content. Don't forget to add a block display to this view! Remember that only
only of these pieces of content will be shown in the block at any one time, as
auto-selected by the above filter view. This is established by adding an
Argument (upper right corner). Tick "Node: Nid" and "Add". On the next panel
press "Provide default value" and then select "Global filter (view)" from the
Argument type radios. Your auto-cycle view should appear in the next drop-down.
Press Update. Ignore the warning: "Cannot modify header information - headers
already sent...". Press Save.

Finally at Structure >> Blocks, move your block from the Disabled section into
the desired page region. Verify the block appears and note that with every new
page you visit it gets populated with another piece of content from your block
view.