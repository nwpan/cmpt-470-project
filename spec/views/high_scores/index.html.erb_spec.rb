require 'spec_helper'

describe "high_scores/index" do
  before(:each) do
    assign(:high_scores, [
      stub_model(HighScore,
        :user_id => 1,
        :game => "Game",
        :score => 2
      ),
      stub_model(HighScore,
        :user_id => 1,
        :game => "Game",
        :score => 2
      )
    ])
  end

  it "renders a list of high_scores" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Game".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
  end
end
