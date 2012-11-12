require 'spec_helper'

describe "items/new" do
  before(:each) do
    assign(:item, stub_model(Item,
      :name => "MyString",
      :item_type => "MyString",
      :price => 1,
      :image_url => "MyString",
      :description => "MyText"
    ).as_new_record)
  end

  it "renders new item form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => items_path, :method => "post" do
      assert_select "input#item_name", :name => "item[name]"
      assert_select "input#item_item_type", :name => "item[item_type]"
      assert_select "input#item_price", :name => "item[price]"
      assert_select "input#item_image_url", :name => "item[image_url]"
      assert_select "textarea#item_description", :name => "item[description]"
    end
  end
end
