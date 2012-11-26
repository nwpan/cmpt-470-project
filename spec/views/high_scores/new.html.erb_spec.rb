require 'spec_helper'

describe "high_scores/new" do
  before(:each) do
    assign(:high_score, stub_model(HighScore,
      :user_id => 1,
      :game => "MyString",
      :score => 1
    ).as_new_record)
  end

  it "renders new high_score form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => high_scores_path, :method => "post" do
      assert_select "input#high_score_user_id", :name => "high_score[user_id]"
      assert_select "input#high_score_game", :name => "high_score[game]"
      assert_select "input#high_score_score", :name => "high_score[score]"
    end
  end
end
