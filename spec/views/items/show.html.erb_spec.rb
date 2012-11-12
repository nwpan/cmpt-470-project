require 'spec_helper'

describe "items/show" do
  before(:each) do
    @item = assign(:item, stub_model(Item,
      :name => "Name",
      :item_type => "Item Type",
      :price => 1,
      :image_url => "Image Url",
      :description => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/Item Type/)
    rendered.should match(/1/)
    rendered.should match(/Image Url/)
    rendered.should match(/MyText/)
  end
end
