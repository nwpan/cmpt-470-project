require 'spec_helper'

describe "high_scores/show" do
  before(:each) do
    @high_score = assign(:high_score, stub_model(HighScore,
      :user_id => 1,
      :game => "Game",
      :score => 2
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Game/)
    rendered.should match(/2/)
  end
end
