package com.mobile;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.List;

public class ReactDrawGraphViewManager extends SimpleViewManager<DrawGraphView> {
    private static final String NAME = "DrawGraphView";


    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected DrawGraphView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new DrawGraphView(reactContext);
    }

    @ReactProp(name = "srx")
    public void setSrx(DrawGraphView view, float srx) {
        view.setSrx(srx);
        view.reDraw();
    }

    @ReactProp(name = "sry")
    public void setSry(DrawGraphView view, float sry) {
        view.setSry(sry);
        view.reDraw();
    }

    @ReactProp(name = "scale")
    public void setScale(DrawGraphView view, float scale) {
        view.setScale(scale);
        view.reDraw();
    }

    @ReactProp(name = "radius1")
    public void setRadius1(DrawGraphView view, float radius1) {
        view.setRadius1(radius1);
        view.reDraw();
    }

    @ReactProp(name = "radius2")
    public void setRadius2(DrawGraphView view, float radius2) {
        view.setRadius2(radius2);
        view.reDraw();
    }

    @ReactProp(name = "points")
    public void setPoints(DrawGraphView view, ReadableArray points) {
        ArrayList<Float> newPoints = new ArrayList<>();
        for(int i = 0; i < points.size() - 1; i++) {
            double x = points.getDouble(i);
            double y = points.getDouble(i + 1);
            newPoints.add((float) x);
            newPoints.add((float) y);
        }
        view.setPoints(newPoints);
        view.reDraw();
    }
}
