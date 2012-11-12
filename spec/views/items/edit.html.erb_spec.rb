require 'spec_helper'

describe "items/edit" do
  before(:each) do
    @item = assign(:item, stub_model(Item,
      :name => "MyString",
      :item_type => "MyString",
      :price => 1,
      :image_url => "MyString",
      :description => "MyText"
    ))
  end

  it "renders the edit item form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => items_path(@item), :method => "post" do
      assert_select "input#item_name", :name => "item[name]"
      assert_select "input#item_item_type", :name => "item[item_type]"
      assert_select "input#item_price", :name => "item[price]"
      assert_select "input#item_image_url", :name => "item[image_url]"
      assert_select "textarea#item_description", :name => "item[description]"
    end
  end
end
